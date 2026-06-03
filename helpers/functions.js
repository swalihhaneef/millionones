import moment from "moment";
export function getGreeting() {
  const now = moment();
  const hour = now.hour();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
export const dateConverter = (date) => {
  const formats = [moment.ISO_8601, "YYYY-MM-DD HH:mm:ss"];
  const isValidDate = moment(date, formats, true).isValid();
  return isValidDate ? moment(date).format("DD-MM-YYYY") : "";
};

export const timeConverter = (time) => {
  const formats = ["HH:mm:ss", "HH:mm", "YYYY-MM-DD HH:mm:ss"];
  const isValidTime = moment(time, formats, true).isValid();
  return isValidTime ? moment(time, formats).format("hh:mm a") : "";
};

export const toTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export const cleanObj = (obj) => {
  Object.keys(obj).map((key) => {
    const val = obj[key];
    if (Array.isArray(val) && val.length === 0) {
      delete obj[key];
      return;
    }
    if (typeof val === "object" && Object.keys(val).length == 0) {
      delete obj[key];
      return;
    }
  });

  return obj;
};

export const setMetaTitleAndDesc = (title, desc, absolute = true) => {
  if (!(title && desc)) return {};

  const obj = {
    title: {},
    description: desc,
    openGraph: {
      title: {},
      description: desc,
    },
  };

  if (absolute) {
    obj.title.absolute = title;
    obj.openGraph.title.absolute = title;
  } else {
    obj.title = title;
    obj.openGraph.title = title;
  }

  return obj;
};
