<h1 align="center">Dizy</h1>

<p align="center"><em>A lightweight Vanilla JavaScript Dependency Injection implementation with lifecycles.</em></p>

<p align="center">
  <a href="CONTRIBUTING.md">Contributing Guidelines</a>
  ·
  <a href="https://github.com/hegelband/dizy/issues">Submit an Issue</a>
  <br>
</p>

<p align="center">
	<a href="https://www.npmjs.com/package/dizy" target="__blank"><img src="https://img.shields.io/npm/v/dizy?logo=npm&logoColor=fff&label=NPM+package&color=limegreen" alt="NPM version"></a>
	<a href="https://codecov.io/gh/kelian9/dizy" >
		<img src="https://codecov.io/gh/kelian9/dizy/graph/badge.svg?token=0ASEASXF1Q"/>
	</a>
</p>

# Getting Started

## Installation

```Shell
npm install dizy
```

## Simple usage

```javascript
import { ContextContainerFactory, SingletoneConfig } from "dizy";

// Create array of di object configurations
const diObjectsConfigs = [
     // Singletone object config
    new SingletoneConfig(
        'carService', // name of DI Object
        CarService // DI Object class or function
    ),
    new SingletoneConfig('engineService', EngineService),
];

// Class of your app where you want to use DI
// It's just an example, you can use it anywhere
class App {
    constructor() {
        // Next to lines of code is needed for configuring your DI Context
        this.context = ContextContainerFactory.createContainer(diObjectsConfigs, 'appContext');
        this.context.init(); // Runs the context
    }

    start() {
        const carService = this.context.getInstance('carService'); // Getting instance of your DI Object
        carService.check();
    }
}

class CarService {
    constructor(engineService) { // name of constructor parameter must be equal to name of object in DI Context
        this.engineService = engineService;
    }

    check() {
        this.engineService.pressure();
    }
}

class EngineService {
    constructor() { }

    pressure() {
        console.log('Pressure is high!');
    }
}


```
<!-- ### Describe DI Config -->

# Introduction

Welcome to the documentation of <strong>Dizy</strong>! This library provides a powerful and flexible solution for managing dependencies in your applications, making it easier to write maintainable and testable code.

Dependency injection is a design pattern that allows you to decouple components from their dependencies, making them more reusable and easier to test. With our DI library, you can easily inject dependencies into your components, allowing them to focus on their core functionality.

The library offers a simple and intuitive API, making it easy to get started with dependency injection.

In this documentation, we'll cover everything you need to know about using <strong>Dizy</strong>. We'll start with an overview of the library's features and how they can benefit your projects. Then, we'll dive into specific examples of how to use the library in different scenarios. Finally, we'll provide some tips and best practices for working with the library effectively.

Let's get started and explore the power of dependency injection with Dizy!

## Goals  

<!-- 1. Помочь разработчику писать более надежный и легко читаемый код.
2. Упростить и ускорить процесс разработки.
3. Позволить фиксировать результаты архитектурного анализа в форме объектов программного обеспечения
4. Обечпечить возможность быстрой замены или отключения объектов ПО
5. Гарантировать соблюдение жизненного цикла объектов и предоставить возможность создания особенных жизненных циклов
6. Предоставить инструменты конфигурирования самих объектов -->
1. Help the developer write more reliable and easy to read code.
2. Simplify and speed up the development process.
3. Allow you to commit the results of architectural analysis in the software objects form.
4. Provide the ability to quickly replace or disable software objects.
5. Ensure compliance with the lifecycle of objects and provide an opportunity to create special lifecycles.
6. Provide tools for configuring objects

## Review of approaches

### Service Locator


### Dependency Injection


### Dizy multilifecycle


## Other implementations and performance overview

## Authors

## Supporters

[**Become a sponsor on patreon**](https://www.patreon.com/Hegelband)  

[**Become a sponsor on opencollective**](https://opencollective.com/hegelband/projects/dizy-js) to get your company in front of future thousands of engaged developers and help us out!

**Love Dizy? Give our repo a star :star: :arrow_up:.**
