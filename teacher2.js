document.addEventListener("DOMContentLoaded", () => {
  const classList = document.getElementById("class-list");
  const notificationList = document.getElementById("notification-list");
  const myClasses = document.getElementById("my-classes");
  const attendanceRecords = document.getElementById("attendance-records");
  const classSelect = document.getElementById("class-select");
  const inbox = document.getElementById("inbox");
  const resourceList = document.getElementById("resource-list");

  // Sample data
  const classes = [
      { name: "Math 101", time: "10:00 AM" },
      { name: "English 202", time: "1:00 PM" }
  ];

  const notifications = [
      "School meeting at 3 PM.",
      "Submit grades by Friday."
  ];

  const messages = [
      { recipient: "Student A", content: "Please complete your assignment." },
      { recipient: "Parent B", content: "Your child is doing great!" }
  ];

  const resources = [
      { title: "Lesson Plan 1", file: "lesson_plan_1.pdf" },
      { title: "Worksheet 1", file: "worksheet_1.docx" }
  ];

  const attendance = [];

  // Populate class list and notifications
  classes.forEach(cls => {
      const li = document.createElement("li");
      li.textContent = `${cls.name} at ${cls.time}`;
      classList.appendChild(li);

      const classOption = document.createElement("option");
      classOption.value = cls.name;
      classOption.textContent = cls.name;
      classSelect.appendChild(classOption);

      myClasses.appendChild(li.cloneNode(true));
  });

  notifications.forEach(notification => {
      const li = document.createElement("li");
      li.textContent = notification;
      notificationList.appendChild(li);
  });

  messages.forEach(message => {
      const li = document.createElement("li");
      li.textContent = `To: ${message.recipient} - ${message.content}`;
      inbox.appendChild(li);
  });

  resources.forEach(resource => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#">${resource.title}</a>`;
      resourceList.appendChild(li);
  });

  // Add new class
  document.getElementById("add-class-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const className = document.getElementById("class-name").value;
      const classTime = document.getElementById("class-time").value;
      const li = document.createElement("li");
      li.textContent = `${className} at ${classTime}`;
      myClasses.appendChild(li);
      document.getElementById("add-class-form").reset();

      const classOption = document.createElement("option");
      classOption.value = className;
      classOption.textContent = className;
      classSelect.appendChild(classOption);
  });

  // Mark attendance
  document.getElementById("mark-attendance-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const className = document.getElementById("class-select").value;
      const studentName = document.getElementById("student-name").value;
      const record = `${className} - ${studentName}`;
      attendance.push(record);

      const li = document.createElement("li");
      li.textContent = record;
      attendanceRecords.appendChild(li);
      document.getElementById("mark-attendance-form").reset();
  });

  // Send new message
  document.getElementById("send-message-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const recipient = document.getElementById("recipient").value;
      const content = document.getElementById("message-content").value;
      const li = document.createElement("li");
      li.textContent = `To: ${recipient} - ${content}`;
      inbox.appendChild(li);
      document.getElementById("send-message-form").reset();
  });

  // Upload new resource
  document.getElementById("upload-resource-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const resourceTitle = document.getElementById("resource-title").value;
      const resourceFile = document.getElementById("resource-file").value.split("\\").pop();
      const resource = { title: resourceTitle, file: resourceFile };
      resources.push(resource);

      const li = document.createElement("li");
      li.innerHTML = `<a href="#">${resource.title}</a>`;
      resourceList.appendChild(li);
      document.getElementById("upload-resource-form").reset();
  });
});
