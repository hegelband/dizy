
import DIClazzModule from "./DIClazz.js";
import {
	DIObjectConfig as DIObjectConfigModule,
	DemandedConfig as DemandedConfigModule,
	SessionConfig as SessionConfigModule,
	SingletoneConfig as SingletoneConfigModule,
} from "./DIObjectConfig.js";
import DIObjectKeyModule from "./containers/helpers/DIObjectKey.js";
import ContextContainerModule from "./containers/ContextContainer.js";
import AbstractContextContainerModule from "./containers/AbstractContextContainer.js";
import DemandedFactoryModule from "./containers/DemandedFactory.js";
import SessionContainerModule from "./containers/SessionContainer.js";
import SimpleContainerModule from "./containers/SimpleContainer.js";
import SingletoneContainerModule from "./containers/SingletoneContainer.js";
import DemandedLifecycleModule from "./lifecycle/DemandedLifecycle.js";
import LifecycleModule from "./lifecycle/Lifecycle.js";
import SessionLifecycleModule from "./lifecycle/SessionLifecycle.js";
import SingletoneLifecycleModule from "./lifecycle/SingletoneLifecycle.js";

const Dizy = {
	ContextContainer: ContextContainerModule,
	AbstractContextContainer: AbstractContextContainerModule,
	DemandedFactory: DemandedFactoryModule,
	SimpleContainer: SimpleContainerModule,
	SessionContainer: SessionContainerModule,
	SingletoneContainer: SingletoneContainerModule,
	DIObjectKey: DIObjectKeyModule,
	DemandedConfig: DemandedConfigModule,
	SessionConfig: SessionConfigModule,
	SingletoneConfig: SingletoneConfigModule,
	DIObjectConfig: DIObjectConfigModule,
	DIClazz: DIClazzModule,
	DemandedLifecycle: DemandedLifecycleModule,
	SingletoneLifecycle: SingletoneLifecycleModule,
	SessionLifecycle: SessionLifecycleModule,
	Lifecycle: LifecycleModule,
};

module.exports.ContextContainer = Dizy.ContextContainer;
module.exports.AbstractContextContainer = Dizy.AbstractContextContainer;
module.exports.DemandedConfig = Dizy.DemandedConfig;
module.exports.SessionConfig = Dizy.SessionConfig;
module.exports.SingletoneConfig = Dizy.SingletoneConfig;
module.exports.DIObjectConfig = Dizy.DIObjectConfig;
module.exports.DIClazz = Dizy.DIClazz;
module.exports.DIObjectKey = Dizy.DIObjectKey;
module.exports.SingletoneContainer = Dizy.SingletoneContainer;
module.exports.SimpleContainer = Dizy.SimpleContainer;
module.exports.DemandedFactory = Dizy.DemandedFactory;
module.exports.SessionContainer = Dizy.SessionContainer;
module.exports.DemandedLifecycle = Dizy.DemandedLifecycle;
module.exports.SingletoneLifecycle = Dizy.SingletoneLifecycle;
module.exports.SessionLifecycle = Dizy.SessionLifecycle;
module.exports.Lifecycle = Dizy.Lifecycle;

module.exports = Dizy;
