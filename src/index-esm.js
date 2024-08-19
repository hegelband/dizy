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
import ContextContainerFactoryModule from "./containers/ContextContainerFactory.js";
import AbstractContextContainerFactoryModule from "./containers/AbstractContextContainerFactory.js";

/** @module Dizy */

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
	ContextContainerFactory: ContextContainerFactoryModule,
	AbstractContextContainerFactory: AbstractContextContainerFactoryModule,
};

export const AbstractContextContainer = Dizy.AbstractContextContainer;
export const ContextContainer = Dizy.ContextContainer;
export const ContextContainerFactory = Dizy.ContextContainerFactory;
export const AbstractContextContainerFactory = Dizy.AbstractContextContainerFactory;
export const DemandedConfig = Dizy.DemandedConfig;
export const SessionConfig = Dizy.SessionConfig;
export const SingletoneConfig = Dizy.SingletoneConfig;
export const DIObjectConfig = Dizy.DIObjectConfig;
export const DIClazz = Dizy.DIClazz;
export const DIObjectKey = Dizy.DIObjectKey;
export const SingletoneContainer = Dizy.SingletoneContainer;
export const SimpleContainer = Dizy.SimpleContainer;
export const DemandedFactory = Dizy.DemandedFactory;
export const SessionContainer = Dizy.SessionContainer;
export const DemandedLifecycle = Dizy.DemandedLifecycle;
export const SingletoneLifecycle = Dizy.SingletoneLifecycle;
export const SessionLifecycle = Dizy.SessionLifecycle;
export const Lifecycle = Dizy.Lifecycle;

export default Dizy;
