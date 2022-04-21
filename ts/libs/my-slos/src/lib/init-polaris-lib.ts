import { PolarisRuntime } from '@polaris-sloc/core';
import { LatencySloMapping } from './slo-mappings/latency.slo-mapping';

/**
 * Initializes this library and registers its types with the transformer in the `PolarisRuntime`.
 */
export function initPolarisLib(polarisRuntime: PolarisRuntime): void {
    polarisRuntime.transformer.registerObjectKind(new LatencySloMapping().objectKind, LatencySloMapping);
}
