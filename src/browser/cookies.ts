export function setCookie(cname: string, cvalue: string, exdays: number, cdomain: string = "") {
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = "expires=" + d.toUTCString()
  const domain = cdomain ? ";domain=" + cdomain : ""
  const cookie = `${cname}=${cvalue};${expires}${domain};path=/`
  document.cookie = cookie
}

export const removeCookie = (cname: string) => setCookie(cname, "", -1)

export function getCookie(cname: string) {
  var name = cname + "="
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(";")
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}
