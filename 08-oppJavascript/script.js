"use strict";

/*

    Lecture: What is object oriented programming? Use course pdf.
        
    In javascript, there are two major paradigms, object oriented programming and functional programming.\

    Up until now, we have only used objects as loose collections of data without making them interact with one another.

    Also, we didn't have a way to generate objects programmatically, but, in oop, we actually need a way to create new objects from our code.

    In traditional oop, we use something called classes. You can think of a class as a blueprint, which can then be used to create new objects, based on the rules described in the class.

    Data is, well, data (userName, password, email) and behavior are the methods (login function).

    All objects created from a class are called instances of that class. An instance is a real object that we can use in our code. The class itself is not an object. We can use the class to create as many instances as we need in our application. 

    The four fundamental principles of opp are abstraction, encapsulation, inheritance and polymorphism. These are the principles that we must have in mind when creating classes (the blueprint) for a good class implementation.

    Polymorphism - a child class can overwrite a inherited method.


*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: OOP in javascript. check pdf

    How oop in javascript is different from the more traditional oop.

    In javascript, things work a bit differently from what we've learned in the last lecture. Understanding classes and instances of traditional oop is important because we have similar concepts in javascript.

    In javascript, we have something called prototypes. All objects in javascript are linked to a certain prototype object. We say that each object has a prototype.

    The prototype object contains methods and properties that all the objects that are linked to that prototype can access and use. 

    This behavior is usually called prototypal inheritance. Basically, objects inherit methods and properties from the prototype.

    This inheritance is different from the one that we've talked about in the last lecture. That was one class inheriting from another class, in this case is an instance inheriting from a class.

    We can also say that objects delegate behavior (methods) to the linked prototype object (delegation). On the other hand, in classical opp with classes, the behavior is actually copied from the class to the object.

    We have actually seen the prototypal inheritance/delegation mechanism in action before. 

    Each time that we've used an array method like map, we were able to use that method because of prototypal inheritance. That's why, when checking for documentation about any array method, you see that it is actually called array.prototype.map.

    Array.prototype is the prototype object of all the arrays that we create in javascript. This prototype object contains all the array methods, including map.

    So, since array.prototype is the prototype of any array that we create, this means that our arrays are linked to that prototype.
    Therefore, having access to all the methods that are defined on the array.prototype object.

    In a sense, our arrays inherit the methods from the prototype, we can also say that our array delegated the behavior of mapping to its prototype.

        So, how do we implement oop in javascript, practically speaking?

    There are three different ways of doing all this: the constructor function technique, ES6 classes (different from the classes from the last lecture) and also the Object.create().


*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Constructor functions and the new operator.


*/

// Let's start implementing opp now, starting with constructor functions.

// We can use constructor functions to, programmatically, build an object.
// A constructor function is a completely normal function, the only difference is that we call a constructor function with the new operator.

// Function declarations and function expressions work, however arrow functions don't work as constructor because they don't have their own this keyword.

// IMPORTANT - By convention, constructor functions always start with a capital letter. Notice how Map or any other follow this convention as well.

const Person = function (firstName, birthYear) {
  //console.log(this);

  // We say that these are instance properties:
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const francisco = new Person("Francisco", 1988); // new operator when we call the function.

// As you can see, we call this function with the new operator. What it does is to call the Person function.

// This is a special operator, when we call a function with it, four steps happen behind the scenes:

// IMPORTANT
// 1 - A new empty object is created.

// 2 - The function is called, and, in this function call, the THIS keyword will be set to this newly created object.
// Basically, in the execution context of the Person function, the THIS keyword will point to this new object. THIS = {}

// 3 - This newly created object is linked to a prototype (more about this further ahead). For now just worry about creating the object itself.

// 4 - The object that was created in the beginning is then automatically returned from the constructor function. At this point, the object no longer needs to be empty.

console.log(francisco); // Person {firstName: 'Francisco', birthYear: 1988}

// Now, of course, we can use this constructor function to create as many different objects as we want.

const joe = new Person("Joe", 1999);
console.log(joe);

// Remember from previous lessons that, in classical oop, an object created from a class is called an instance.

// Technically, we did't create a class here because, as we saw before, javascript doesn't really have classes in the same sense of traditional oop.

// However, we did create an object from a constructor function and, these functions have been used in javascript to kind of simulate classes.

// Therefore, we can say that each of the objects that we've created are instances of Person. There is even an operator that we can use to test for that:

console.log(francisco instanceof Person); // true

// IMPORTANT - What if we wanted to add a method to our objects? It is a really bad practice to add methods to the constructor function (we could just add it as an instance method), however never do that.

// Imagine that were gonna create a hundred person objects using the constructor function. What would happen is that each of these objects would carry around the method.

// In that situation, each if the hundred person objects would have a copy of the method, which is terrible for the performance of our code.

// To solve this problem, we are going to use prototypes and prototypal inheritance in the next lessons.

// Keep in mind these four steps and the magic of the new operator.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*


    Lecture: Prototypes.


*/

// We are going to continue with example from the previous video.

// Actually, we already talked about prototypes, prototypal inheritance and delegation earlier already. But how does all of that actually work?

// First, each and every function in javascript automatically has a property called prototype. This includes constructor functions.

// Every object that is created by a certain constructor function will get access to (inherit) all the methods and properties that we define on the constructors prototype property.

// Just to visualize, in our case it would be Person.prototype, so the prototype property of the constructor function.

// Let's now add a method to this prototype property:

console.log(Person.prototype); // Already have the method here

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

// Remember that each object created by the person constructor function will get access to the prototype property. So we can do this:

francisco.calcAge(); // 35 - So we can use this method on the francisco object, even though it is not on the object itself.

// We have access to it because of prototypal inheritance.

console.log(francisco.__proto__); // To see the prototype of the francisco object.
console.log(francisco.__proto__ === Person.prototype); // true

// We can also set properties on the prototype, not just methods.

Person.prototype.species = "Homo Sapiens";

console.log(francisco.species, joe); // As you can see in joe, the species property is not directly in the object, it is not it's own property.

// Owned properties are only the ones that are declared on the object itself. Not including the inherited properties.

// We can check for that:

console.log(francisco.hasOwnProperty("firstName")); // true
console.log(francisco.hasOwnProperty("species")); // false

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Lecture: Prototypal inheritance and the prototype chain. Check pdf.
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Prototypal inheritance on built in objects (such as arrays).

*/

const arr = [3, 5, 6, 7, 8, 9]; // new Array === []

console.log(arr.__proto__); // The prototype of array (Array constructor), where we have all the methods that we already know.

// Notice that each array does not have all of these methods, instead, each array will inherit the methods from its prototype.

console.log(arr.__proto__.__proto__); // Here we have object.prototype again, so all the methods that are available for objects.

// You can conclude that the prototypal inheritance is really a mechanism for reusing code. All of the built in methods have to exist only once, somewhere in the javascript engine.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Coding challenge 1 

    1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;

    2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;

    3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;

    4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀

*/

// Solution from the course:

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

/*

My Solution - The fundamentals of these lectures were understood, i just interpreted the exercise in a wrong way. Of course, now it makes sense not to store the results into variables, this would make the methods usable only once. We want the speed to adjust at each function call.

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  const newSpeed = this.speed + 10;
  console.log(`New speed is ${newSpeed} km/h`);
};

Car.prototype.brake = function () {
  const newSpeed = this.speed - 5;
  console.log(`New speed is ${newSpeed} km/h`);
};

const bmw = new Car("BMW", 120);
console.log(bmw);

const mercedes = new Car("Mercedes", 95);
console.log(mercedes);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate(); // Always 130
bmw.brake();
mercedes.accelerate();
mercedes.brake();
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: ES6 classes.

    As mentioned before, javascript classes do not work like traditional classes (like in java or c++).

    Instead, classes in javascript are just syntactic sugar over what we learned in the previous lessons.

    They still implement prototypal inheritance behind the scenes, but with a syntax that makes more sense for people coming from other programming languages.

*/

// Let's now implement person using a class.

// Class expression:

// const PersonCl = class {};

// Class declaration:

class PersonClass {
  // Inside the class, the first thing that we need to do is to add a constructor method. This constructor actually works in a similar way as a constructor function.
  // The difference is that this one is a method of this class and it NEEDS to be called constructor.

  constructor(firstName, birthYear) {
    this.firstName = firstName; // Just like before
    this.birthYear = birthYear;
  }

  // Now its time for the methods, we just have to write them outside of the constructor. They will be added to the .prototype property of the PersonClass.

  calcAge() {
    console.log(2023 - this.birthYear);
  }
}

const jessica = new PersonClass("Jessica", 1996);
console.log(jessica); // Just like before

jessica.calcAge();

console.log(jessica.__proto__ === PersonClass.prototype); // True, just like before.

// Adding a method manually to the prototype (best practice is to write the methods on the class of course):

PersonClass.prototype.greet = function () {
  console.log(`Hey ${this.firstName}!`);
};
jessica.greet();

/*
    A few things about classes that are important to keep in mind:

    1 - Classes are NOT hoisted, even if they are class declarations. To remember, function declarations are hoisted, which means we can use them before they are declared in the code. With classes that doesn't work. 

    2 - Just like functions, classes are first-class citizens. Meaning that we can pass them into functions and also return them from functions. Classes are really just a special kind of function behind the scenes.

    3 - The body of a class is always executed in strict mode.

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Setters and getters. READ documentation about it, specially setters and getters.

    Let's talk about a feature that is actually common to all objects in javascript.

    Every object in javascript can have setter and getter properties. We call these special properties assessor properties, while others are called data properties.

    These are properties (functions basically) that, just as the name says, set and get values.

*/

// Let's first take a look at setters and getters in a simple object literal.

const account = {
  owner: "Francisco",
  movements: [200, 530, 120, 300],

  // To add a getter to this object, we can simply start by writing a normal method.
  // Let's say that we want a method to get the latest movement, then we just need to prepend the keyword get:

  get latest() {
    return this.movements.slice(-1).pop(); // pop because slice returns an array, we want the value.
  },

  // We can do the same with a setter to add a new movement to the movements array.
  // Any setter method needs to have EXACTLY one parameter (a movement in this case).

  set latest(mov) {
    this.movements.push(mov);
  },
};

// To use the getter, we just write it as if it was just a property. This can be very useful when we want to read something as a property, but still need to do some calculations before.

console.log(account.latest); // 300

// How to call the setter:

// account.latest() - If it was a method but, remember that now latest is like a property. We can simply set it, just like we set any other property.

account.latest = 50;
console.log(account); // 50 inside of the movements array.

// Classes also have getters and setters, they work in the exact same way. They are very useful for data validation. Check the final code (from the lessons) to see how this is done because we need to create a new property on the setter (if we don't, the constructor function and the setter will conflict). Although we are creating a new property, we can compute that one, or create a getter to have the "previous one".

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Static methods.

    A good example to understand what a static method actually is, is the built in Array.from method.

    As you remember, this method converts any array like structure to a real array.
    What matters here is that this from method is attached to the Array constructor. 

    We could not use the from method on an array - [1, 2, 3].from() it's not going to work.

    This happens because the from method is really attached to the entire Array constructor, not to the prototype property of the constructor. 
    Meaning that all the arrays do not inherit this method.
    We say that the from method is in the Array name space.

    This is the same of saying that the from method is static on the Array constructor.

    To create static methods on classes we just need to write static keyword before (instance methods and static methods). 
    This methods are not inherited, but can be useful to implement some kind of helper function about a class or about a constructor function. 

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Object.create() - check pdf

    We've learned about constructor functions and ES6 classes, but there is a third way of implementing prototypal inheritance or delegation.

    This third way is to use the Object.create() function, which work in a pretty different way than the others. 

    With Object.create(), there is still the idea of prototypal inheritance. However, there are no prototype properties involved.

    Also, there is no constructor functions an no new operator.

    Instead, we can use Object.create() to manually set the prototype of an object, to any other object that we want.

    This is the least used method, however, understand how it works because we are going to need it to link prototypes in further lessons. That seems to be the power of this method.

*/

// Let's then create the object that we want to be the prototype of all the person objects.

const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // Create a new object with base on the PersonProto - prototype.

console.log(steven); // Empty object, but with calcAge on the prototype.

steven.name = "Steven";
steven.birthYear = 2002;

steven.calcAge(); // Now we can call calcAge - 21

console.log(steven); // The object with the properties

// Let's create another object

const sarah = Object.create(PersonProto);

// Let's set the properties in a better way (programmatically). We create a method in the PersonProto that is a little bit similar to the constructor that we have in classes. init()

sarah.init("Sarah", 1979);
sarah.calcAge();
console.log(sarah);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Coding challenge 2

    1. Re-create challenge 1, but this time using an ES6 class;

    2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);

    3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);

    4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀

*/

class CarClass {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
  // Read more about the setter.
}

const ford = new CarClass("Ford", 120);
// console.log(ford.speedUs);
// ford.accelerate();
// ford.accelerate();
// ford.accelerate();
// ford.brake();
// console.log(ford.speedUs);
// ford.speedUs = 75;
// console.log(ford);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Inheritance between classes: constructor functions.

    We've talked about prototypal inheritance, now let's see how classes can inherit from other classes.

    We will create a new class called student and make it inherit from the person class.

    Person class will be the parent class and student will be the child class. Student is a subtype of person.

    This is really useful because, with this inheritance setup, we can have specific methods for the student and generic methods that come from the person class, like the calcAge method.

    We will inherit between classes using constructor functions first, then the same thing with ES6 classes (much easier) and finally with object.create.
*/

//  Constructor functions:

const PersonConstrInheritance = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonConstrInheritance.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

// Now we start by building a constructor function for the student.
// Usually, we want the child class to have the same functionality as the parent class, but with some additional functionality.
// We pass the same arguments usually, and some additional ones.

const Student = function (firstName, birthYear, course) {
  //   this.firstName = firstName;
  //   this.birthYear = birthYear;
  //   CHECK 1
  PersonConstrInheritance.call(this, firstName, birthYear);
  this.course = course;
};

// CHECK 2. We need to manually define the prototype exactly here in the code.
// We need to make this connection here, before we add any (more) methods to the prototype object of student.
// Because Object.create() will return an empty object. At this point, student.prototype is empty.
// Then, onto this empty object, we can add methods like the introduce.
// The other way around (after we create the introduce method), object.create() overwrites all the methods added before.

Student.prototype = Object.create(PersonConstrInheritance.prototype);
// With this, the student.prototype object is now an object that inherits from person.prototype.

// Create a new method called introduce

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.course}`);
};

// Now create a new student.

const mike = new Student("Mike", 2000, "Computer Science");
// console.log(mike);
mike.introduce();

/*
    1. Check pdf
    This is repeated code of the parent constructor function. 
    
    First we are repeating ourselves.

    Second, and even worse, if the implementation of person changes, that change will not be reflected in the student. 

    To solve this, we could simply call the person function:
        Person(firstName, birthYear)

    However, this produces an error, cannot set property "firstName" of UNDEFINED.

    The problem is that we are calling the Person constructor function as a regular call. We are not using the new operator to call it.

    Remember that in a regular function call, the this keyword is set to undefined, therefore we get the error.

    Instead of simply calling the Person function, we need to manually set the this keyword as well.

    Remember that to call a function and, at the same time, set the this keyword inside that function, we can use the call method.

    The call method will call the person function and let's us specify the this keyword as the first argument. Person.call(this, firstName, birthYear);

    In our example, we want the this keyword inside the person function to be the this keyword inside the student function.
    Remember that the this keyword is going to be the empty object that is being created by the new operator.
*/

/*

    2.
    Now we need to, manually link the student prototype to the person prototype, so we can have access to the same methods.

    Check the pdf to visually understand better. 

    We have the student constructor function and the student prototype. To make the student.prototype connect with the person.prototype we use object.create().

    Defining prototypes manually is what object.create() does.

    You might ask why don't we just: student.prototype = person.prototype.

    We want to inherit from it, but it should not be the exact same object (hence object.create()).

*/

// With all this in place, we are now able to:

mike.calcAge(); // 23 - working properly

/*

    Let's analyze why this works (check pdf).

    When we do mike.calcAge(), we are doing a property of a method lookup.

    As we know, calcAge() is not directly on the mike object. It's also not in mike's prototype.
    That's where we defined the introduce method, but not calcAge.

    So, if it is not on the object prototype, javascript will look up even further in the prototype chain trying to find the method.


*/

// To finish, inspect all of this in the console so you can see the chain.

console.log(mike.__proto__); // PersonConstrInheritance {introduce: ƒ}
console.log(mike.__proto__.__proto__); // To see the next prototype on the chain. This already contains the calcAge().

console.log(mike.__proto__.__proto__.__proto__); // The constructor (top)

console.log(mike instanceof PersonConstrInheritance);

// It's better to use the console to visualize this, if you do that you will see that the prototype of mike is actually PersonConstrInheritance, which is not correct.

// Mike is of the type student and not person.

// When we take a look at:

console.dir(Student.prototype.constructor); // Ideally, this should point back to the student, but it points to PersonConstrInheritance.

// Javascript thinks that the constructor of student.prototype is PersonConstrInheritance.

// This happens because we set the prototype property of the student using object.create().

// We need to fix this because, sometimes it's important to rely on this constructor property.

Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Coding challenge 3.

    1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);

    2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';

    3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';

    4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);


GOOD LUCK 😀
*/

const eVehicle = function (make, speed, charge) {
  Car.call(this, make, speed);

  this.charge = charge;
};

// Link the prototype:
eVehicle.prototype = Object.create(Car.prototype);

// Methods:
eVehicle.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// IMPORTANT - SEE BELOW
eVehicle.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new eVehicle("Tesla", 120, 23);
// console.log(tesla);

// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(90);
// console.log(tesla);

// POLYMORPHISM - The creation of a new accelerate method was to demonstrate that, when there are two methods or properties with the same name in a prototype chain, javascript uses the first one that finds.

// Car also have an accelerate method, but, because it is in the parent prototype of eVehicle and there is a method with the same name in this child prototype, that is the one that is used.

// This is an example of how a child class can overwrite a method that inherited from the parent class.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Inheritance between classes: ES6 classes.

    Let's implement the same thing using ES6 classes instead of constructor functions.

class PersonClass {
  constructor(firstName, birthYear) {
    this.firstName = firstName; // Just like before
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2023 - this.birthYear);
  }
}

*/

// To implement inheritance between ES6 classes, we need two ingredients: the extent keyword and the super function.

// So, to make this student class inherit from the person class all we need to do is to say extends and the name of the parent class.

// Next, if we are going to add properties, in this case "course", we need to use the super function (after the constructor). Because it is responsible for the creation of the this keyword. That's why it always needs to come first on the code, if we don't use it, we cannot set this.course = course;

// If we weren't adding properties (course), we wouldn't even need any constructor function at all (in the child class). In this case, the super function would automatically be called with all the arguments that are passed into the constructor.

class studentClass extends PersonClass {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear); // Always needs to happen FIRST!
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} and i study ${this.course}`);
  }

  // If we wanted to overwrite calcAge for example, we would overwrite the one coming from the parent class (Shadowing the one in the parent class).
}

const jane = new studentClass("Jane", 2001, "Computer Science");
jane.introduce();
jane.calcAge();
console.log(jane);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Inheritance between classes: Object.create()

    Finally, let's look at how we can use Object.create() in order to implement a complex prototype chain. 

    Similar to what we've done before with classes and constructor functions.

    We will use the PersonProto object that we've created before, which will serve as the prototype to create a new person object using object.create().
    
    This will be our parent class:

const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); 

*/

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
jay.introduce();
jay.calcAge();

// Here we are not faking classes, all we are doing is simply linking objects together.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Another class example.

    There are a few more things that we need to learn about classes.

*/

// Let's create a new class now:

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = []; // 1.
    this.locale = navigator.language; // 1
  }

  // 2. Public interface
  deposit(value) {
    this.movements.push(value);
  }

  withdrawal(value) {
    this.deposit(-value); // We can call the deposit method because it's gonna work the same way, but with a negative value. IMPORTANT - calling other methods inside of a certain method.
  }

  // 3.
  approveLoan(value) {
    return true; // returns true all the time, not intended to have a complex logic here
  }
  requestLoan(value) {
    // we can make the approval of the loan based on some condition and, that condition could come from other method (requestLoan in this case):

    if (this.approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan approved`);
    }
  }
}

// Now we create a new account:

const acc1 = new Account("Francisco", "Euro", 1111);
//console.log(acc1); // We have the three values (that we've passed into the constructor), now inside of the object.

// 1.
//But what about the movements array and also, maybe the local? We want to start always with an empty array as the movements.

// The local we want to get from navigator.language, but how should we do that?

// Should we add another parameter in the constructor function (constructor(owner, currency, pin, movements) and then always pass in an empty array ("Francisco", "Euro", 1111, [])?

// That would work, but it doesn't make much sense to always pass in this empty array into all the accounts that we want to create.

// This is something that we've never done before, but we can create even more properties on any instance. These properties do not need to be based on any inputs.

// In fact, we can even execute any code in the constructor, like a greeting message for the user when he opens an account.

// But what about the deposits and the withdrawals? Basically, how do we add the values to the movements array?

// We could do this:

// acc1.movements.push(250);
// acc1.movements.push(-140);
// console.log(acc1);

// However, it's not a good idea to interacting with a property like this, it's a lot better to create methods that interact with these properties.
// This is especially true for important properties like the movements.

// 2.
// Let's create a deposit and a withdrawal method then.

// Now we can add the values in a much nicer way:

acc1.deposit(140);
acc1.withdrawal(39);
console.log(acc1);

// Our movements array looks the same as before, but now we are actually using this public interface that we built with the two methods.

// Basically, these methods are the interface to our objects, we also call this API.

// Still, there is nothing stopping someone from interacting with the movements array directly.

// The simple fact that we have the methods, doesn't make it impossible to still do this: acc1.movements.push(250);

// The same goes for the pin. Now, we can access the pin from outside of the account:

console.log(acc1.pin); // Probably it shouldn't be accessible from outside of the class.

// This is a very IMPORTANT concern, the same goes for methods:

// 3.
// Say that we have a request loan for some value.

acc1.requestLoan(1000);
// console.log(acc1); // Loan approved and the value is in the deposit.

// In the public interface, so the API, we basically only want the requestLoan method.

// We want to be able to request the loan, however, nothing is stopping us from doing this:

// acc1.approveLoan(1000); This does not work of course but, in the real world, we shouldn't even be allowed to access this kind of method.

// approveLoan() is kind of an internal method that only the requestLoan method should be able to use.

// This enhances the importance of data encapsulation and data privacy, which we will implement in the next lectures.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Encapsulation: protected properties and methods.

    In the last lecture we implemented a new class, which showed us the need for encapsulation and data privacy.

    First, encapsulation basically means to keep some properties and methods private inside the class, so they are not accessible from outside of that same class.

    Then, the rest of the methods are exposed as a public interface, which we call API.

    There are two big reasons why we need encapsulation and data privacy:

      First, it is to prevent code from outside of a class to accidentally manipulate our data inside the class. acc1.movements.push(250);

      Second, when we expose only a small interface (a small API consisting only of a few public methods), then we can change all the other internal methods with more confidence.

    However, javascript classes do not yet support real data privacy and encapsulation.

    There is a proposal to add truly private class fields and methods to the language but it's not ready yet.

    In this lecture we will talk about faking encapsulation by simply using a convention.

    A convention is nothing more that a way of communicating to other developers that the properties of methods should not be manipulated directly.

    For this, developers agreed to use the _ so that they could easily see that those properties of methods are private. this._movements = [];

    If we still wanted to give access to the movements array from the outside, we would have to implement a public method for that.

    It is common to have a method called get or set instead of using a real setter or getter:

    getMovements() {
      return this._movements; Imagine that the underscore was there (convention).
    }

    Now, this would be the correct way to get the movements outside, because they can access them but not overwrite (or set): acc2.getMovements()

    Of course, this does not make impossible to access the data from outside.

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Encapsulation: private class fields and methods.

    Let's now implement truly private classes and methods.

    Private class fields and methods are actually part of a bigger proposal for improving and changing javascript classes, which is called class fields.

    In this proposal, there are actually four different kinds of fields and methods (eight actually but focusing on the main).

    Public fields, private fields, public methods and private methods. Essentially, there is a public and a private version of both fields and methods.

*/

// Let's start with the public fields. You can think of a field as a property that will be on all instances (can also be called public instance field).

// In our example, the two fields could be the movements and the locale because these are two properties that are going to be on all objects (instances) created with this class.

class Account2 {
  // PUBLIC FIELDS - notice the semi colon. All works the same as we comment out the properties on the constructor. They are present on all the instances, but they are NOT on the prototype. IMPORTANT
  // These public fields are also referenceable by the this keyword and via this keyword.

  locale = navigator.language;

  // PRIVATE FIELDS (NOT on the prototype. IMPORTANT) - Here is where we make properties not accessible from the outside.
  // The hash (#) is the syntax that makes the field private. Like this we get an error.
  // The reason for that is that the property is now really called #movements, so we need to change that everywhere.
  // Now, if we try to read the movements from acc2 outside we get an error - see below in 1.
  // Now, to get the movements, we only have the getMovements method (that was the point of its creation in the first place).

  #movements = [];

  // The next property to make private is the pin, however, here things are a bit different because we are setting the pin based on the input value on the constructor.
  // We cannot define a field in the constructor, fields must be outside of any method.
  // What we must do is to create the field outside and don't set it to anything. It's essentially like creating an empty variable.
  // Then we redefine the value inside of the constructor.

  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;

    this.currency = currency;

    this.#pin = pin; // REDEFINING the value

    // this.movements = [];

    // this.locale = navigator.language;
  }

  // Public interface - Public methods (nothing to talk about) - see the private below.

  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  withdrawal(value) {
    this.deposit(-value);
    return this;
  }

  // approveLoan(value) {
  //   return true;
  // }

  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan approved`);
      return this;
    }
  }

  // Private methods - The syntax is the same with the #.
  // In the case of approveLoan() notice that we also redefine the method in the requestLoan().
  // By the time this lesson was recorded, google chrome simply made this method like a private field (was not in the prototype but in the instance instead).
  // BUT NOW, private methods are no longer placed in the instance, they are not on the prototype also, instead the console shows us a new top of the prototypal chain.
  // This can mean that private methods have their own place in the prototypal chain - READ MORE ABOUT THIS.

  #approveLoan(value) {
    return true;
  }
}

const acc2 = new Account2("Francisco", "Euro", 1111);
acc2.deposit(1000);
acc2.requestLoan(2000);
console.log(acc2);

// console.log(acc2.#movements); // 1. Uncaught SyntaxError
// console.log(acc2.getMovements());

const acc3 = new Account2("Joe", "Euro", 2222);
acc3.requestLoan(4000);
console.log(acc3);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Encapsulation: Chaining methods.

    We can implement the same ability of chaining methods in the methods of our class.

*/

// This is extremely easy to do, all we need is to return the object itself at the end of a method that we want to be chainable.

// Let's say that we want to do this:

// acc2
//   .deposit(399)
//   .deposit(500)
//   .withdrawal(34)
//   .requestLoan(1000)
//   .withdrawal(4000);

// Right now this produces an error, that's because the first deposit works, but it doesn't return nothing (we are not returning nothing explicitly).

// If we don't return nothing, then we are calling the next deposit on undefined.

// What we need to do is to call deposit on the account, in other words, we want the result of the first deposit to be the account object.

// To make it work, all we need to do is to return the account object in the methods, and the account is === to the this keyword (check the methods in the class).

// Returning the object (returning this), basically makes the method chainable.

acc2
  .deposit(399)
  .deposit(500)
  .withdrawal(34)
  .requestLoan(1000)
  .withdrawal(4000);
console.log(acc2); // Voila

// This makes most sense in methods that actually set some property (like the ones that we have).

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: ES6 classes summary - Check the pdf

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Challenge 4

    1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class;

    2. Make the 'charge' property private;

    3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chaining!

DATA CAR 1: 'opel' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀


class CarClass {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
  // Read more about the setter.
}

*/

class EVcl extends CarClass {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const opel = new EVcl("Opel", 120, 23);
console.log(opel);

opel
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(opel.speedUs); // Using the getters and getters of the parent class.
