interface AnimalProps {
    type: string;
    weight?: number;
    speed?: number;
    swimmingSpeed?: number;
}

class AnimalFarm {
    removedAnimals: any[] = [];
    animals: any[] = [];

    constructor(public farm: HTMLDivElement) {}

    add(animals: AnimalProps[]): void {
        animals.forEach((animal: AnimalProps) => {
            let createdAnimal:Animals;
            switch (animal.type) {
                case "elephant":
                    createdAnimal = Elephant.createElephantInstance(animal.weight as number);
                    break;
                case "rabbit":
                    createdAnimal = Rabbit.createRabbitInstance(animal.speed as number);
                    break;
                case "penguin":
                    createdAnimal = Penguin.createPenguinInstance(animal.swimmingSpeed as number);
                    break;
                default:
                    console.error("We don't support the creation of this animal");
                    return;
                };
                this.farm.appendChild(createdAnimal.element);
            });
    };

    removeAnimalOnClick(event: Event): void {
        const parentNodeId = animalFarm.farm.id;
        const animals: Element[] = Array.from(animalFarm.farm.children);
        const index = animals.indexOf(event.currentTarget as HTMLElement);
        if(index === -1) {
            console.error("Can't remove the right animal")
        };
        switch(parentNodeId) {
            case "Animals_div":
                animalFarm.removedAnimals.push(animalFarm.animals[index]);
                animalFarm.animals.splice(index, 1);
                animalFarm.farm.removeChild(event.currentTarget as HTMLElement);
                break;
            default:
                console.error("No such farm exists");
                return;
        };
    }

    removeAnimal(animal: Element): void {
        const animals: Element[] = Array.from(animalFarm.farm.children);
        const index: number = animals.indexOf(animal);
        this.removedAnimals.push(this.animals[index]);
        animalFarm.animals.splice(index, 1);
        this.farm.removeChild(animal);
    }

    returnDeletedAnimals() {
        for(let i = 0; i < this.removedAnimals.length; i++) {
            this.farm.appendChild(this.removedAnimals[i].element);
            this.animals.push(this.removedAnimals[i]);
        }
        
        this.removedAnimals = [];
    }

    leaveOnlyPenguins(): void {
        const animals: Element[] = Array.from(animalFarm.farm.children);
        animals.forEach((animal: Element) => {
            if (animal.attributes[0].value === 'rabbit' || animal.attributes[0].value === 'elephant') {
                this.removeAnimal(animal);
            };
        })
    }

    addAnimalToFarm(animal: Animals): void {
        this.animals.push(animal);
    }
}

let aList = document.getElementById("Animals_div") as HTMLDivElement;
const animalFarm = new AnimalFarm(aList);

abstract class Animal {
    element = document.createElement('div') as HTMLDivElement;
    abstract type: string;
    abstract note: string;
    abstract image: string;

    constructor(public specialProperty: number) {}

    createElement() {
        this.element.setAttribute('type', this.type);
        let atext = document.createElement('p') as HTMLParagraphElement;
        atext.innerHTML = this.note;
        let aImage = document.createElement('img') as HTMLImageElement;
        aImage.src = this.image;
        this.element.appendChild(aImage);
        this.element.appendChild(atext);
        this.element.addEventListener('click', animalFarm.removeAnimalOnClick);
        animalFarm.addAnimalToFarm(this);
        return this.element;
    };
}

class Penguin extends Animal {
    type = "penguin";
    note = `The Penguin Swimming Speed is:${this.specialProperty}km/h`;
    image = "./images/img03.jpg";
    
    constructor(public specialProperty: number) {
        super(specialProperty);
        super.createElement();
    }
    
    static createPenguinInstance(specialProperty: number): Penguin {
        return new Penguin(specialProperty);
    }
}

class Rabbit extends Animal {
    type = "rabbit";
    note = `The Rabbit Speed is:${this.specialProperty}km/h`;
    image = "./images/img02.jpg";
    
    constructor(public specialProperty: number) {
        super(specialProperty);
        super.createElement();
    }

    static createRabbitInstance(specialProperty: number): Rabbit {
        return new Rabbit(specialProperty);
    } 
};

class Elephant extends Animal {
    type = "elephant";
    note = `The Elephant Weight is:${this.specialProperty}kg`;
    image = "./images/img01.jpg";
    
    constructor(public specialProperty: number) {
        super(specialProperty);
        super.createElement();
    }

    static createElephantInstance(specialProperty: number): Elephant {
        return new Elephant(specialProperty);
    } 
};

type Animals = Rabbit | Penguin | Elephant;

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