import {query, Request, Response} from 'express';
import Animals from '../models/animalModel';
import mongoose from 'mongoose';
import axios from 'axios';
import Path from 'path';


const sharp = require('sharp');

const check = async (req: Request, res: Response) => {
    try {
        let list: any
        const {id, size, url}: any = req.query
        if (!id && !size && url) {
            list = await Animals.find({"url": url})
        }
        if (!id && !url && size) {
            list = await Animals.find({
                "size": {
                    "height": size.height,
                    "width": size.width
                }
            })
        }
        if (!url && !size && id) {
            list = await Animals.find({"_id": id})
        }
        if (!id && !size && !url) {
            list = await Animals.find()
        }


        let arr: any[] = []

        list.forEach((data: any) => {

            arr.push(Path.basename(data.url))

        })

        const response = arr.map(item => `<img src="http://localhost:5000/static/${item}" />`).join('\n')

        res.send(response)

    } catch (err: any) {
        console.log(err)
    }
};
const take = async (req: Request, res: Response) => {
    try {
        const {size} = req.body;

        const url = await download(await get(), size);
        const animal: any = await Animals.create({
            _id: new mongoose.Types.ObjectId(),
            url,
            size
        });
        res.json(animal);
    } catch (e) {
        res.status(500).json(e);
    }
};

function parsing() {
    const URL = 'https://random.dog/woof';
    return axios.get(URL)
        .then(res => {
            const file: any = res.data;
            const arr = file.split('.').reverse();

            if (arr[0] === 'mp4' || arr[0] === 'gif' || arr[0] === 'webm') {
                return false;
            }

            return 'https://random.dog/' + file;
        });
}

async function get() {
    let a = await parsing();
    while (!a) {
        a = await parsing();
    }
    return a;
}


async function download(url: any, size: any) {

    try {
        const input = (await axios({url: url, responseType: "arraybuffer"})).data as Buffer;

        const arr = url.split('/').reverse()
        const format: string = arr[0]

        let img = await sharp(input)
            .resize(size.height, size.width)
            .toFile(`./img/${format}`)

        let link: string = Path.resolve('./img/' + format)
        return link


    } catch (err) {
        console.log(err)
    }
}

export default {check, take};
