import { MessageType } from '@adiwajshing/baileys'
import { join } from 'path'
import { IReply } from '../Typings'
import Utils from '../Utils'

const xre = `https://opengraph.githubassets.com/e3ea92ae0b9155ea89ae7afad6a83898b4555bf33b7c0abeef478ba694de5e1f/Synthesized-Infinity/Whatsapp-Botto-Xre`
export const info = async (): Promise<IReply> => {
    //eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require(join(__dirname, '..', '..', 'package.json'))
    const deps = Object.keys(pkg.dependencies)
    return {
        body: await Utils.download(xre),
        caption: `๐ค ${process.env.BOT_NAME} ๐ค\n\n๐ *Homepage:* ${pkg.homepage}\n\n๐ *Repository:* ${
            pkg.repository.url
        }\n\n๐ *Dependencies:*\n${deps.join(
            '\n'
        )}\n\n๐ *Stickers:* https://www.npmjs.com/package/wa-sticker-formatter\n\n๐ ๏ธ *APIs & Tools:* https://express-is-fun.herokuapp.com/api/endpoints\n\n*-แดกแด-สแดแดแดแด-xสแด-*`,
        type: MessageType.image
    }
}

export const getRepoInfo = async (type: 'issues' | 'commits'): Promise<IReply> => {
    const data = await Utils.fetch(`https://api.github.com/repos/Synthesized-Infinity/Whatsapp-Botto-Xre/${type}`, {})
    if (!data[0]) return { body: '๐ฎ *No Issues open* ๐ฎ' }
    let body = `๐ *WhatsApp Botto Xre-Recent ${Utils.capitalize(type)}* ๐\n\n`
    const len = data.length < 5 ? data.length : 5
    if (type === 'commits') {
        for (let c = 0; c < len; c++) {
            body += `*#${c + 1}.*\nโ๏ธ *Commit Message:* ${data[c].commit.message}\n๐ *Date:* ${
                data[c].commit.author.date
            }\n๐ฑ *Author:* ${data[c].commit.author.name}\n๐ *URL*: ${data[c]['html_url']}\n\n`
        }
        return { caption: body, body: await Utils.download(`${xre}/commit/${data[0].sha}`), type: MessageType.image }
    }
    for (let i = 0; i < data.length; i++) {
        body += `*#${i + 1}.*\n\n๐ด *Title: ${data[i].title}*\n๐ฑ *User:* ${data[i].user.login}\nใฝ๏ธ URL: ${
            data[i].url
        }\n\n`
    }
    return { body }
}
