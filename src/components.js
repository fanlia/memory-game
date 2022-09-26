
import { a, h, link } from 'small-cup'
import _ from 'lodash'

import { words } from './words.js'

const getNumbers = (n = 2) => new Array(n).fill(0).map(d => Math.round(Math.random() * 100))
const n2s = (ns) => ns.map(d => String(d).padStart(2, '0')).join('')

const getAnswer = (ns) => {
    return _.chain(words.length)
        .times()
        .filter(d => !ns.includes(d))
        .sampleSize(ns.length * 4)
        .concat(ns)
        .shuffle()
        .value()
}

export default {
    a,
    game: (el, ctx, render) => {

        const number = h('strong', {
            style: { fontSize: '48px' },
        }, '----')

        const answerEl = h('div', {
            className: 'row mt-3',
        }, [])

        const handleNumber = async () => {
            let data = getNumbers()
            let answers = getAnswer(data)
            let selected = 0

            const cats = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${answers.length}`).then(res => res.json())

            console.log(cats)

            number.textContent = n2s(data)

            h(answerEl, {}, answers.map((d, i) => h('div', {
                className: 'col',
            }, [
                h('div', {
                    style: { width: '200px' },
                }, [
                    h('button', {
                        className: 'btn',
                        onclick: (e) => {
                            if (data.includes(d)) {
                                e.target.classList.add('btn-success')
                                selected++
                            }
                            if (selected === data.length) {
                                alert('恭喜你，答对了')
                            }
                        },
                    }, words[d]),
                    h('img', { src: cats[i].url, style: {width: '100%', height: 'auto'} }),
                ]),
            ])))
            }

        h(el, {}, [
            h('p', {}, [
                number,
            ]),
            h('p', {}, [
                h('button', {
                    className: 'btn btn-primary',
                    onclick: handleNumber,
                }, '生成数字')
            ]),
            answerEl,
        ])
    },
    memory: (el) => {
        h(el, {
            className: 'row mt-3',
        }, words.map((d, i) => h('div', {
            className: 'col border',
        }, [
            h('div', {
                style: { width: '100px' },
            }, [
                h('h3', {}, d),
                h('p', {}, String(i).padStart(2, '0')),
            ]),
        ])))
    },
}
