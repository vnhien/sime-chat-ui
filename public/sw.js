self.addEventListener("activate", (event) => {
  console.log("🚀 ~ activating:", event);
});

self.addEventListener("install", (event) => {
  console.log("🚀 ~ installing:", event);
});

self.addEventListener("fetch", (event) => {
  console.log("🚀 ~ fetching:", event);
});

self.addEventListener("push", (event) => {
  console.log("🚀 ~ event:", event);
  const data = event.data?.json() || {};
  console.log("🚀 ~ data:", data);
  event.waitUntil(
    self.registration.showNotification(data.title || "New Notification", {
      body: data.content || "",
      icon: "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_640.jpg",
    })
  );
});
