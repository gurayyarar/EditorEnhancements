import * as crypto from "crypto";
const Entities = require('html-entities').AllHtmlEntities;
var removeDiacritics = require('diacritics').remove;
var titleCase = require('title-case');

const entities = new Entities();

export const Utils: any = {
    htmlEncode: (text: string): string => {
        return entities.encode(text);
    },
    htmlDecode: (text: string): string => {
        return entities.decode(text);
    },
    urlEncode: (text: string): string => {
        return encodeURIComponent(text);
    },
    urlDecode: (text: string): string => {
        return decodeURIComponent(text);
    },
    toTitleCase: (text: string): string => {
        return titleCase(text);
    },
    toLowerCase: (text: string): string => {
        return text.toLowerCase();
    },
    toUpperCase: (text: string): string => {
        return text.toUpperCase();
    },
    capitalizeFirstLetter: (text: string): string => {
        text = text.toLowerCase();
        return text.charAt(0).toUpperCase() + text.slice(1);
    },
    reverse: (text: string): string => {
        return text.split("").reverse().join("");
    },
    removeAccent: (text: string): string => {
        return removeDiacritics(text);
    },
    toMd5: (text: string): string => {
        return crypto.createHash("md5").update(text).digest("hex");
    },
    toSha1: (text: string): string => {
        return crypto.createHash("sha1").update(text).digest("hex");
    },
    toSha256: (text: string): string => {
        return crypto.createHash("sha256").update(text).digest("hex");
    },
    toSha384: (text: string): string => {
        return crypto.createHash("sha384").update(text).digest("hex");
    },
    toSha512: (text: string): string => {
        return crypto.createHash("sha512").update(text).digest("hex");
    },
    sortAscending: (text: string): string => {
        let pieces: string[] = text.split("\n");
        pieces = pieces.filter(function (n) { return n !== "" && n !== null });

        pieces = pieces.sort();
        return `${pieces.slice(0, -1).join('\n')}\n${pieces.slice(-1)}`;
    },
    sortDescending: (text: string): string => {
        let pieces: string[] = text.split("\n");
        pieces = pieces.filter(function (n) { return n !== "" && n !== null });

        pieces = pieces.sort().reverse();
        return `${pieces.slice(0, -1).join('\n')}\n${pieces.slice(-1)}`;
    },
    removeEmptyLines: (text: string): string => {
        return text.replace(/^\s*$(?:\r\n?|\n)/gm, "");
    },
    removeHorizontalWhiteSpace: (text: string): string => {
        const pieces: string[] = text.split("\n");
        let result: string[] = [];

        pieces.forEach((piece: string, i: number) => {
            piece = piece.replace(/^\s+|\s+$/g, '');
            result.push(piece);
        });

        return `${result.slice(0, -1).join('\n')}\n${result.slice(-1)}`;
    },
    removeDuplicateLines: (text: string): string => {
        const pieces: string[] = text.split("\n");
        let dummyArray: string[] = [];
        let index: number[] = [];
        let result: string[] = [];

        pieces.forEach((piece: string, i: number) => {
            piece = piece.replace(/^\s+|\s+$/g, '');
            piece = piece.toLowerCase();

            if (piece === '<br>' || piece === '<br/>' || piece === '<br />' || dummyArray.indexOf(piece) < 0) {
                index.push(i);
                dummyArray.push(piece);
            }
        });

        index.forEach((i: number) => { result.push(pieces[i]); });
        return `${result.slice(0, -1).join('\n')}\n${result.slice(-1)}`;
    }
};