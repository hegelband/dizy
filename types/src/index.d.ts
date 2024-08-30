/**
 * Dizy type definition
 */
export type Dizy = {
    /**
     * : ContextContainerModule,
     */
    ContextContainer: ContextContainerModule;
    /**
     * : AbstractContextContainerModule,
     */
    AbstractContextContainer: AbstractContextContainerModule;
    /**
     * : DemandedFactoryModule,
     */
    DemandedFactory: DemandedFactoryModule;
    /**
     * : SimpleContainerModule,
     */
    SimpleContainer: SimpleContainerModule;
    /**
     * : SessionContainerModule,
     */
    SessionContainer: SessionContainerModule;
    /**
     * : SingletoneContainerModule,
     */
    SingletoneContainer: SingletoneContainerModule;
    /**
     * : DIObjectKeyModule,
     */
    DIObjectKey: DIObjectKeyModule;
    /**
     * : DemandedConfigModule,
     */
    DemandedConfig: DemandedConfigModule;
    /**
     * : SessionConfigModule,
     */
    SessionConfig: SessionConfigModule;
    /**
     * : SingletoneConfigModule,
     */
    SingletoneConfig: SingletoneConfigModule;
    /**
     * : DIObjectConfigModule,
     */
    DIObjectConfig: DIObjectConfigModule<any>;
    /**
     * : DIClazzModule,
     */
    DIClazz: DIClazzModule;
    /**
     * : DemandedLifecycleModule,
     */
    DemandedLifecycle: DemandedLifecycleModule;
    /**
     * : SingletoneLifecycleModule,
     */
    SingletoneLifecycle: SingletoneLifecycleModule;
    /**
     * : SessionLifecycleModule,
     */
    SessionLifecycle: SessionLifecycleModule;
    /**
     * : LifecycleModule,
     */
    Lifecycle: LifecycleModule;
    /**
     * : ContextContainerFactoryModule,
     */
    ContextContainerFactory: ContextContainerFactoryModule;
    /**
     * : AbstractContextContainerFactoryModule,
     */
    AbstractContextContainerFactory: AbstractContextContainerFactoryModule;
};
import ContextContainerModule from "./containers/ContextContainer.js";
import AbstractContextContainerModule from "./containers/AbstractContextContainer.js";
import DemandedFactoryModule from "./containers/DemandedFactory.js";
import SimpleContainerModule from "./containers/SimpleContainer.js";
import SessionContainerModule from "./containers/SessionContainer.js";
import SingletoneContainerModule from "./containers/SingletoneContainer.js";
import DIObjectKeyModule from "./containers/helpers/DIObjectKey.js";
import { DemandedConfig as DemandedConfigModule } from "./DIObjectConfig.js";
import { SessionConfig as SessionConfigModule } from "./DIObjectConfig.js";
import { SingletoneConfig as SingletoneConfigModule } from "./DIObjectConfig.js";
import { DIObjectConfig as DIObjectConfigModule } from "./DIObjectConfig.js";
import DIClazzModule from "./DIClazz.js";
import DemandedLifecycleModule from "./lifecycle/DemandedLifecycle.js";
import SingletoneLifecycleModule from "./lifecycle/SingletoneLifecycle.js";
import SessionLifecycleModule from "./lifecycle/SessionLifecycle.js";
import LifecycleModule from "./lifecycle/Lifecycle.js";
import ContextContainerFactoryModule from "./containers/ContextContainerFactory.js";
import AbstractContextContainerFactoryModule from "./containers/AbstractContextContainerFactory.js";
