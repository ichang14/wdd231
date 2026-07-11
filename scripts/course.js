const courses = [

{
subject:"CSE",
number:110,
title:"Introduction to Programming",
credits:2,
completed:true
},

{
subject:"WDD",
number:130,
title:"Web Fundamentals",
credits:2,
completed:true
},

{
subject:"CSE",
number:111,
title:"Programming with Functions",
credits:2,
completed:true
},

{
subject:"CSE",
number:210,
title:"Programming with Classes",
credits:2,
completed:false
},

{
subject:"WDD",
number:131,
title:"Dynamic Web Fundamentals",
credits:2,
completed:true
},

{
subject:"WDD",
number:231,
title:"Web Frontend Development I",
credits:2,
completed:false
}

];

const coursesContainer = document.querySelector("#courses");
const creditsSpan = document.querySelector("#credits");

const allBtn = document.querySelector("#all");
const wddBtn = document.querySelector("#wdd");
const cseBtn = document.querySelector("#cse");

function displayCourses(courseList) {
    coursesContainer.innerHTML = "";

    courseList.forEach((course) => {
        const div = document.createElement("div");
        div.classList.add("course");

        if (course.completed) {
            div.classList.add("completed");
        }

        div.innerHTML = `${course.subject} ${course.number}`;
        div.setAttribute("title", course.title);

        coursesContainer.appendChild(div);
    });

    displayCredits(courseList);
}

function displayCredits(courseList) {
    const totalCredits = courseList.reduce((total, course) => total + course.credits, 0);
    creditsSpan.textContent = totalCredits;
}

allBtn.addEventListener("click", () => {
    displayCourses(courses);
});

wddBtn.addEventListener("click", () => {
    const wddCourses = courses.filter((course) => course.subject === "WDD");
    displayCourses(wddCourses);
});

cseBtn.addEventListener("click", () => {
    const cseCourses = courses.filter((course) => course.subject === "CSE");
    displayCourses(cseCourses);
});

displayCourses(courses);