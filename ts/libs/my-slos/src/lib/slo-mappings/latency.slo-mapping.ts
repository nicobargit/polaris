import {
  ObjectKind,
  PolarisType,
  SloCompliance,
  SloMappingBase,
  SloMappingInitData,
  SloMappingSpecBase,
  SloTarget,
  initSelf,
} from '@polaris-sloc/core';

/**
 * Represents the configuration options of the Latency SLO.
 */
export interface LatencySloConfig {
  // ToDo: Add SLO configuration properties.
  responseTimeThresholdMs: number;
  quantile?: number;
}

/**
 * The spec type for the Latency SLO.
 */
export class LatencySloMappingSpec extends SloMappingSpecBase<
  // The SLO's configuration.
  LatencySloConfig,
  // The output type of the SLO.
  SloCompliance,
  // The type of target(s) that the SLO can be applied to.
  SloTarget
> {}

/**
 * Represents an SLO mapping for the Latency SLO, which can be used to apply and configure the Latency SLO.
 */
export class LatencySloMapping extends SloMappingBase<LatencySloMappingSpec> {
  @PolarisType(() => LatencySloMappingSpec)
  spec: LatencySloMappingSpec;

  constructor(initData?: SloMappingInitData<LatencySloMapping>) {
    super(initData);
    this.objectKind = new ObjectKind({
      group: 'slo.polaris-slo-cloud.github.io', // ToDo: Replace the group with your own.
      version: 'v1',
      kind: 'LatencySloMapping',
    });
    initSelf(this, initData);
  }
}

