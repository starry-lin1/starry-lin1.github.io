(function () {
  const subtitles = [
    'Stay hungry, stay foolish.',
    '热爱可抵岁月漫长',
    '万物皆有裂痕，那是光照进来的地方'
  ]

  const clearSubtitleTimer = () => {
    if (window.starrySubtitleTimer) {
      window.clearTimeout(window.starrySubtitleTimer)
      window.starrySubtitleTimer = null
    }
  }

  const startSubtitleSwitch = () => {
    const subtitle = document.getElementById('subtitle')
    if (!subtitle) return

    clearSubtitleTimer()
    subtitle.classList.add('starry-typing')

    let index = 0
    let cursor = 0
    let deleting = false
    let letters = Array.from(subtitles[index])

    const tick = () => {
      subtitle.textContent = letters.slice(0, cursor).join('')

      if (!deleting && cursor < letters.length) {
        cursor += 1
        window.starrySubtitleTimer = window.setTimeout(tick, 82)
        return
      }

      if (!deleting && cursor === letters.length) {
        deleting = true
        window.starrySubtitleTimer = window.setTimeout(tick, 1500)
        return
      }

      if (deleting && cursor > 0) {
        cursor -= 1
        window.starrySubtitleTimer = window.setTimeout(tick, 42)
        return
      }

      index = (index + 1) % subtitles.length
      letters = Array.from(subtitles[index])
      deleting = false
      window.starrySubtitleTimer = window.setTimeout(tick, 260)
    }

    tick()
  }

  const createSakura = () => {
    if (document.querySelector('.starry-sakura')) return

    const layer = document.createElement('div')
    layer.className = 'starry-sakura'

    for (let i = 0; i < 42; i += 1) {
      const petal = document.createElement('span')
      petal.className = 'sakura-petal'
      petal.style.setProperty('--left', `${Math.random() * 100}vw`)
      petal.style.setProperty('--size', `${7 + Math.random() * 11}px`)
      petal.style.setProperty('--duration', `${9 + Math.random() * 11}s`)
      petal.style.setProperty('--delay', `${Math.random() * -18}s`)
      petal.style.setProperty('--drift', `${-54 + Math.random() * 108}px`)
      layer.appendChild(petal)
    }

    document.body.appendChild(layer)
  }

  const dogOneSvg = () => `
    <svg viewBox="0 0 132 98" aria-hidden="true">
      <path class="dog-fill dog-fill-white" d="M37 84 C22 73, 23 47, 38 36 C35 20, 45 14, 55 28 C64 14, 76 17, 72 35 C91 40, 101 57, 96 74 C89 94, 56 96, 37 84 Z" />
      <path class="fluffy" d="M38 84 C27 78, 22 67, 25 54 C27 45, 31 39, 38 36 C35 20, 45 14, 55 28 C64 14, 76 17, 72 35 C88 39, 99 52, 98 67 C96 84, 80 92, 61 91 C51 91, 43 88, 38 84 Z" />
      <path d="M33 48 C23 47, 17 52, 16 61" />
      <path class="tail-one" d="M90 52 C105 38, 111 30, 105 22" />
      <path d="M45 84 L41 94" />
      <path d="M76 86 L81 95" />
      <path d="M62 50 C63 62, 61 70, 56 78" />
      <path d="M82 58 C78 64, 72 66, 67 63" />
    </svg>
  `

  const dogTwoSvg = () => `
    <svg viewBox="0 0 132 98" aria-hidden="true">
      <path class="dog-fill dog-fill-tan" d="M33 72 C24 51, 33 33, 54 29 C62 12, 76 14, 74 31 C88 31, 100 39, 104 54 C111 80, 82 92, 58 85 C46 90, 37 84, 33 72 Z" />
      <path d="M34 72 C25 52, 33 34, 53 29 C60 12, 76 14, 73 31 C88 31, 100 39, 104 54 C110 76, 89 91, 64 87 C53 91, 39 85, 34 72 Z" />
      <path d="M53 31 C42 14, 52 6, 63 25" />
      <path d="M75 31 C85 13, 99 17, 91 37" />
      <path class="tail-two" d="M101 55 C116 45, 122 36, 118 25" />
      <path class="paw-wave" d="M37 61 C25 58, 19 52, 17 45" />
      <path d="M42 76 L35 92" />
      <path d="M68 85 L66 96" />
      <path d="M92 80 L98 93" />
      <path d="M58 50 L58.2 50" />
      <path d="M80 50 L80.2 50" />
      <path d="M64 62 C70 67, 80 65, 85 59" />
    </svg>
  `

  const createDogs = () => {
    if (document.querySelector('.starry-dogs')) return

    const wrap = document.createElement('div')
    wrap.className = 'starry-dogs'
    wrap.innerHTML = `
      <span class="play-heart" aria-hidden="true"></span>
      <span class="play-ball" aria-hidden="true"></span>
      <button class="line-dog dog-one" type="button" aria-label="和白色线条小狗互动">
        ${dogOneSvg()}
        <span class="dog-note">play?</span>
      </button>
      <button class="line-dog dog-two" type="button" aria-label="和棕色线条小狗互动">
        ${dogTwoSvg()}
        <span class="dog-note">wag!</span>
      </button>
    `

    wrap.querySelectorAll('.line-dog').forEach(dog => {
      dog.addEventListener('click', () => {
        wrap.classList.add('is-playing')
        dog.classList.add('is-happy')
        window.setTimeout(() => dog.classList.remove('is-happy'), 900)
        window.setTimeout(() => wrap.classList.remove('is-playing'), 1500)
      })
    })

    document.body.appendChild(wrap)
  }

  const boot = () => {
    startSubtitleSwitch()
    createSakura()
    createDogs()
  }

  document.addEventListener('DOMContentLoaded', boot)
  document.addEventListener('pjax:complete', boot)
})()
