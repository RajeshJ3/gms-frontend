function get_domain() {
  if (window.location.hostname === "localhost") {
    return "http://127.0.0.1:8000";
  } else if (window.location.hostname === "192.168.43.207") {
    return "http://192.168.43.207:8000";
  } else {
    return "https://api.gymslate.ml";
  }
}

export const getToken = localStorage.getItem("token");
export const getUser = JSON.parse(localStorage.getItem('user'));

export const getGymId = (getUser && getUser.owner_profile.length) ? getUser.owner_profile[0].gym : null

export const DOMAIN = get_domain();
export const SITE_URL = "https://www.gymslate.ml";
