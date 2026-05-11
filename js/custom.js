(function () {
  const subtitles = [
    'Stay hungry, stay foolish.',
    '热爱可抵岁月漫长',
    '万物皆有裂痕，那是光照进来的地方'
  ]

  const startSubtitleSwitch = () => {
    const subtitle = document.getElementById('subtitle')
    if (!subtitle || subtitle.dataset.starrySwitcher === 'true') return

    subtitle.dataset.starrySwitcher = 'true'
    let index = 0
    subtitle.textContent = subtitles[index]

    setInterval(() => {
      subtitle.classList.add('subtitle-switching')

      setTimeout(() => {
        index = (index + 1) % subtitles.length
        subtitle.textContent = subtitles[index]
        subtitle.classList.remove('subtitle-switching')
      }, 450)
    }, 2800)
  }

  const createSakura = () => {
    if (document.querySelector('.starry-sakura')) return

    const layer = document.createElement('div')
    layer.className = 'starry-sakura'

    for (let i = 0; i < 34; i += 1) {
      const petal = document.createElement('span')
      petal.className = 'sakura-petal'
      petal.style.setProperty('--left', `${Math.random() * 100}vw`)
      petal.style.setProperty('--size', `${8 + Math.random() * 10}px`)
      petal.style.setProperty('--duration', `${9 + Math.random() * 10}s`)
      petal.style.setProperty('--delay', `${Math.random() * -18}s`)
      petal.style.setProperty('--drift', `${-40 + Math.random() * 80}px`)
      layer.appendChild(petal)
    }

    document.body.appendChild(layer)
  }

  const dogSvg = tailClass => `
    <svg viewBox="0 0 120 78" aria-hidden="true">
      <path class="${tailClass}" d="M90 39 C105 28, 111 20, 115 9" />
      <path d="M28 44 C33 27, 53 19, 74 25 C91 30, 98 42, 91 54 C83 68, 49 67, 36 58 C30 54, 27 49, 28 44 Z" />
      <path d="M38 29 C33 14, 41 7, 50 22" />
      <path d="M63 23 C70 9, 82 12, 78 29" />
      <path d="M32 50 L22 68" />
      <path d="M50 62 L46 74" />
      <path d="M75 62 L80 74" />
      <path d="M39 40 L39.2 40" />
      <path d="M67 40 L67.2 40" />
      <path d="M48 49 C55 54, 63 53, 68 48" />
    </svg>
  `

  const createDogs = () => {
    if (document.querySelector('.starry-dogs')) return

    const wrap = document.createElement('div')
    wrap.className = 'starry-dogs'
    wrap.innerHTML = `
      <button class="line-dog dog-one" type="button" aria-label="和第一只线条小狗互动">
        ${dogSvg('tail-one')}
        <span class="dog-note">Hi</span>
      </button>
      <button class="line-dog dog-two" type="button" aria-label="和第二只线条小狗互动">
        ${dogSvg('tail-two')}
        <span class="dog-note">Wag</span>
      </button>
    `

    wrap.querySelectorAll('.line-dog').forEach(dog => {
      dog.addEventListener('click', () => {
        dog.classList.add('is-happy')
        window.setTimeout(() => dog.classList.remove('is-happy'), 900)
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
