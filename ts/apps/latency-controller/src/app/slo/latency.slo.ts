import { LatencySloConfig } from '@my-org/my-slos';
import {
    Duration,
    LabelFilters,
    LabelGrouping,
    MetricsSource,
    ObservableOrPromise,
    PolarisRuntime,
    ServiceLevelObjective,
    SloCompliance,
    SloMapping,
    SloOutput,
    TimeRange,
} from '@polaris-sloc/core';
import { of as observableOf } from 'rxjs';

export class LatencySlo implements ServiceLevelObjective<LatencySloConfig, SloCompliance>
{
    sloMapping: SloMapping<LatencySloConfig, SloCompliance>;

    private metricsSource: MetricsSource;

    configure(
	sloMapping: SloMapping<LatencySloConfig, SloCompliance>,
        metricsSource: MetricsSource,
        polarisRuntime: PolarisRuntime
    ): ObservableOrPromise<void> {
        this.sloMapping = sloMapping;
        this.metricsSource = metricsSource;
        return observableOf(null);
    }

    evaluate(): ObservableOrPromise<SloOutput<SloCompliance>> {
        return this.calculateSloCompliance().then(compliance => ({
            sloMapping: this.sloMapping,
            elasticityStrategyParams: {
                currSloCompliancePercentage: compliance,
		tolerance: 5
            },
	}));
    }

    private calculateSloCompliance(): Promise<number> {
        return this.metricsSource.getTimeSeriesSource()
            .select<number>('nginx', 'ingress_controller_request_duration_seconds_bucket', TimeRange.fromDuration(Duration.fromMinutes(1)))
            .filterOnLabel(LabelFilters.regex('ingress', `${this.sloMapping.spec.targetRef.name}-ingress`))
            .rate()
            .sumByGroup(LabelGrouping.by('le'))
            .histogramQuantile(this.sloMapping.spec.sloConfig.quantile)
            .execute()
            .then(result => {
                console.log(this.sloMapping.spec.targetRef.name + " " + this.sloMapping.spec.sloConfig.responseTimeThresholdMs)
                console.log(JSON.stringify(result, null, '    '));
                if (result.results.length === 0) {
                    throw new Error('Metric could not be read.');
                }
                //console.log(JSON.stringify(result.results[0])
                //console.log(JSON.stringify(result.results[0].samples)
                //console.log(JSON.stringify(result.results[0].samples[0])
                var latValSec = result.results[0].samples[0].value;
                console.log(latValSec)                
                if(latValSec !== null) {
                    let latencyScore = ((latValSec*1000) / this.sloMapping.spec.sloConfig.responseTimeThresholdMs) * 100;
                    if(!Number.isNaN(Math.floor(latencyScore))) {
                        return Math.floor(latencyScore);
                    }
                    else {
                        console.log("Value is NaN, SloCompliance 0");
                        return 0;
                    }
                }
                else {
                    console.log("There is something wrong");
                    return 0;
                }
            });
    }
}
