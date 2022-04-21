import { PolarisType } from '../transformation';
import { initSelf } from '../util';
import { ApiObjectMetadata } from './api-object-metadata';
import { ObjectKind } from './object-kind';

/**
 * Common superclass for an object that can be added/read/changed/deleted using the orchestrator's API.
 *
 * It is recommended to subclass `ApiObject` for each specific concrete API object and to provide
 * default initialization logic, e.g., for `objectKind`.
 *
 * When registering a `PolarisTransformer` for `ApiObject` for a specific orchestrator, it is recommended
 * to set `PolarisTransformationConfig.inheritable` to `true`, because most subclasses of `ApiObject` will
 * not add additional properties, but just customize the existing ones.
 *
 * @param T Defines the type of the `spec` property.
 */
export class ApiObject<T> {

    /**
     * Indicates the type of the object.
     */
    @PolarisType(() => ObjectKind)
    objectKind: ObjectKind;

    /**
     * Provides metadata about the object, including its name.
     */
    @PolarisType(() => ApiObjectMetadata)
    metadata: ApiObjectMetadata;

    /**
     * The actual content (payload) of the object.
     *
     * This must be decorated with `@PolarisType` if `T` is a class.
     */
    spec?: T;

    constructor(initData?: Partial<ApiObject<T>>) {
        initSelf(this, initData);
    }

}
