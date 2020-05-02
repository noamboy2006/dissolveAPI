jQuery(function ($) {
  $('.sidebar-submenu').slideDown(0)
  for (let i = 0; i < $('a').length; i++) {
    $('a')[i].href = '#' + $('a')[i].innerText.replace(/ /g,'_')
  }
})

function fuckmobile () {
  const width = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  )
  if (width < 768) {
    document.getElementById('sidebar').style.display = 'none'
  } else {
    document.getElementById('sidebar').style.display = 'block'
  }
  window.requestAnimationFrame(fuckmobile)
}
window.requestAnimationFrame(fuckmobile)
