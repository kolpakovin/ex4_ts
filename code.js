"use strict";
class AnimalFarm {
    constructor(farm) {
        this.farm = farm;
        this.removedAnimals = [];
        this.animals = [];
    }
    add(animals) {
        animals.forEach((animal) => {
            let createdAnimal;
            switch (animal.type) {
                case "elephant":
                    createdAnimal = Elephant.createElephantInstance(animal.weight);
                    break;
                case "rabbit":
                    createdAnimal = Rabbit.createRabbitInstance(animal.speed);
                    break;
                case "penguin":
                    createdAnimal = Penguin.createPenguinInstance(animal.swimmingSpeed);
                    break;
                default:
                    console.error("We don't support the creation of this animal");
                    return;
            }
            ;
            this.farm.appendChild(createdAnimal.element);
        });
    }
    ;
    removeAnimalOnClick(event) {
        const parentNodeId = animalFarm.farm.id;
        const animals = Array.from(animalFarm.farm.children);
        const index = animals.indexOf(event.currentTarget);
        if (index === -1) {
            console.error("Can't remove the right animal");
        }
        ;
        switch (parentNodeId) {
            case "Animals_div":
                animalFarm.removedAnimals.push(animalFarm.animals[index]);
                animalFarm.animals.splice(index, 1);
                animalFarm.farm.removeChild(event.currentTarget);
                break;
            default:
                console.error("No such farm exists");
                return;
        }
        ;
    }
    removeAnimal(animal) {
        const animals = Array.from(animalFarm.farm.children);
        const index = animals.indexOf(animal);
        this.removedAnimals.push(this.animals[index]);
        animalFarm.animals.splice(index, 1);
        this.farm.removeChild(animal);
    }
    returnDeletedAnimals() {
        for (let i = 0; i < this.removedAnimals.length; i++) {
            this.farm.appendChild(this.removedAnimals[i].element);
            this.animals.push(this.removedAnimals[i]);
        }
        this.removedAnimals = [];
    }
    leaveOnlyPenguins() {
        const animals = Array.from(animalFarm.farm.children);
        animals.forEach((animal) => {
            if (animal.attributes[0].value === 'rabbit' || animal.attributes[0].value === 'elephant') {
                this.removeAnimal(animal);
            }
            ;
        });
    }
    addAnimalToFarm(animal) {
        this.animals.push(animal);
    }
}
let aList = document.getElementById("Animals_div");
const animalFarm = new AnimalFarm(aList);
class Animal {
    constructor(specialProperty) {
        this.specialProperty = specialProperty;
        this.element = document.createElement('div');
    }
    createElement() {
        this.element.setAttribute('type', this.type);
        let atext = document.createElement('p');
        atext.innerHTML = this.note;
        let aImage = document.createElement('img');
        aImage.src = this.image;
        this.element.appendChild(aImage);
        this.element.appendChild(atext);
        this.element.addEventListener('click', animalFarm.removeAnimalOnClick);
        animalFarm.addAnimalToFarm(this);
        return this.element;
    }
    ;
}
class Penguin extends Animal {
    constructor(specialProperty) {
        super(specialProperty);
        this.specialProperty = specialProperty;
        this.type = "penguin";
        this.note = `The Penguin Swimming Speed is:${this.specialProperty}km/h`;
        this.image = "./images/img03.jpg";
        super.createElement();
    }
    static createPenguinInstance(specialProperty) {
        return new Penguin(specialProperty);
    }
}
class Rabbit extends Animal {
    constructor(specialProperty) {
        super(specialProperty);
        this.specialProperty = specialProperty;
        this.type = "rabbit";
        this.note = `The Rabbit Speed is:${this.specialProperty}km/h`;
        this.image = "./images/img02.jpg";
        super.createElement();
    }
    static createRabbitInstance(specialProperty) {
        return new Rabbit(specialProperty);
    }
}
;
class Elephant extends Animal {
    constructor(specialProperty) {
        super(specialProperty);
        this.specialProperty = specialProperty;
        this.type = "elephant";
        this.note = `The Elephant Weight is:${this.specialProperty}kg`;
        this.image = "./images/img01.jpg";
        super.createElement();
    }
    static createElephantInstance(specialProperty) {
        return new Elephant(specialProperty);
    }
}
;
let aAnimal1 = Elephant.createElephantInstance(780);
let aAnimal2 = Elephant.createElephantInstance(650);
let aAnimal3 = Elephant.createElephantInstance(300);
let aAnimal4 = Elephant.createElephantInstance(500);
aList.appendChild(aAnimal1.element);
aList.appendChild(aAnimal2.element);
aList.appendChild(aAnimal3.element);
aList.appendChild(aAnimal4.element);
let aData = [{ "type": "elephant", "weight": 660 }, { "type": "rabbit", "speed": 44 }, { "type": "penguin", "swimmingSpeed": 750 }, { "type": "elephant", "weight": 600 }, { "type": "penguin", "swimmingSpeed": 60 }];
animalFarm.add(aData);
