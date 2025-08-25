import { Hero } from "@/types/battle";

// Mock hero data (simulating SuperHero API)
export const MOCK_HEROES: Hero[] = [
  {
    id: "1",
    name: "Superman",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/667.jpg",

    powerstats: {
      intelligence: 94,
      strength: 100,
      speed: 99,
      durability: 100,
      power: 100,
      combat: 85,
    },
    biography: { fullName: "Clark Kent", publisher: "DC Comics" },
  },
  {
    id: "2",
    name: "Spider-Man",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/133.jpg",
    powerstats: {
      intelligence: 90,
      strength: 55,
      speed: 67,
      durability: 74,
      power: 74,
      combat: 85,
    },
    biography: { fullName: "Peter Parker", publisher: "Marvel Comics" },
  },
  {
    id: "3",
    name: "Wonder Woman",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/807.jpg",
    powerstats: {
      intelligence: 88,
      strength: 100,
      speed: 79,
      durability: 100,
      power: 100,
      combat: 100,
    },
    biography: { fullName: "Diana Prince", publisher: "DC Comics" },
  },
  {
    id: "4",
    name: "Iron Man",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/85.jpg",
    powerstats: {
      intelligence: 100,
      strength: 85,
      speed: 58,
      durability: 85,
      power: 100,
      combat: 64,
    },
    biography: { fullName: "Tony Stark", publisher: "Marvel Comics" },
  },
  {
    id: "5",
    name: "Batman",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg",
    powerstats: {
      intelligence: 100,
      strength: 26,
      speed: 27,
      durability: 50,
      power: 47,
      combat: 100,
    },
    biography: { fullName: "Bruce Wayne", publisher: "DC Comics" },
  },
  {
    id: "6",
    name: "Thor",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/140.jpg",
    powerstats: {
      intelligence: 69,
      strength: 100,
      speed: 83,
      durability: 100,
      power: 100,
      combat: 100,
    },
    biography: { fullName: "Thor Odinson", publisher: "Marvel Comics" },
  },
  {
    id: "7",
    name: "The Flash",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/891.jpg",
    powerstats: {
      intelligence: 63,
      strength: 48,
      speed: 100,
      durability: 60,
      power: 68,
      combat: 32,
    },
    biography: { fullName: "Barry Allen", publisher: "DC Comics" },
  },
  {
    id: "8",
    name: "Hulk",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/83.jpg",
    powerstats: {
      intelligence: 38,
      strength: 100,
      speed: 47,
      durability: 100,
      power: 98,
      combat: 64,
    },
    biography: { fullName: "Bruce Banner", publisher: "Marvel Comics" },
  },
  {
    id: "9",
    name: "Nick Fury",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/326.jpg",
    powerstats: {
      intelligence: 75,
      strength: 11,
      speed: 23,
      durability: 42,
      power: 25,
      combat: 100,
    },
    biography: { fullName: "Nicholas Joseph Fury", publisher: "Marvel Comics" },
  },
  {
    id: "10",
    name: "Ant-Man",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/857.jpg",
    powerstats: {
      intelligence: 100,
      strength: 18,
      speed: 23,
      durability: 28,
      power: 32,
      combat: 32,
    },
    biography: { fullName: "Hank Pym", publisher: "Marvel Comics" },
  },
  {
    id: "11",
    name: "Captain America",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/274.jpg",
    powerstats: {
      intelligence: 69,
      strength: 19,
      speed: 38,
      durability: 55,
      power: 60,
      combat: 100,
    },
    biography: { fullName: "Steve Rogers", publisher: "Marvel Comics" },
  },
  {
    id: "12",
    name: "Loki",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/928.jpg",
    powerstats: {
      intelligence: 88,
      strength: 63,
      speed: 46,
      durability: 85,
      power: 100,
      combat: 60,
    },
    biography: { fullName: "Loki Laufeyson", publisher: "Marvel Comics" },
  },
];

// Utility function to calculate total hero power
export const calculateHeroPower = (hero: Hero): number => {
  return Object.values(hero.powerstats).reduce((sum, stat) => sum + stat, 0);
};
