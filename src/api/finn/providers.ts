import { Request, Response } from 'express';

const providers = [
  {
    id: -3,
    name: 'Swintt',
    logo: 'swintt.png',
  },
  {
    id: 1,
    name: 'Microgaming',
    logo: 'microgaming.png',
  },
  {
    id: 7,
    name: 'Greentube',
    logo: 'greentube.png',
  },
  {
    id: 30,
    name: 'Endorphina',
    logo: 'endorphina.svg',
  },
  {
    id: 37,
    name: 'GameArt',
    logo: 'gameart.png',
  },
  {
    id: 83,
    name: 'Nolimit City',
    logo: 'nolimit.png',
  },
  {
    id: 93,
    name: 'Merkur',
    logo: 'merkur.png',
  },
  {
    id: 97,
    name: 'Blueprint Gaming',
    logo: 'blueprint.png',
  },
  {
    id: 101,
    name: 'Relax Gaming',
    logo: 'relax.png',
  },
];

export const ProvidersApi = async (req: Request, res: Response) => {
  res.status(200).json({ data: providers });
};
