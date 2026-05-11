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

  document.addEventListener('DOMContentLoaded', startSubtitleSwitch)
  document.addEventListener('pjax:complete', startSubtitleSwitch)
})()
