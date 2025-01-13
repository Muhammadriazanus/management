import { FC } from 'react';

type MenuProps = {
  userRole: 'admin' | 'teacher' | 'student' | 'parent';
};

const Menu: FC<MenuProps> = ({ userRole }) => {
  const menuItems = [
    {
      title: "MENU",
      items: [
        { icon: "/home.png", label: "Home", href: "/dashboarduser", visible: ["admin", "teacher", "student", "parent"] },
        { icon: "/teacher.png", label: "Teachers", href: "/allteacherdata", visible: ["admin", "teacher"] },
        { icon: "/student.png", label: "Students", href: "/allstudentrecords", visible: ["admin", "teacher"] },
        { icon: "/parent.png", label: "Parents", href: "/list/allparentrecords", visible: ["admin", "teacher"] },
        { icon: "/subject.png", label: "Subjects", href: "/subjectrecord", visible: ["admin"] },
        { icon: "/class.png", label: "Classes", href: "/list/class", visible: ["admin", "teacher"] },
        { icon: "/lesson.png", label: "Lessons", href: "/list/lessons", visible: ["admin", "teacher"] },
        { icon: "/exam.png", label: "Exams", href: "/list/allexamdetails", visible: ["admin", "teacher", "student", "parent"] },
        { icon: "/assignment.png", label: "Assignments", href: "/list/assi", visible: ["admin", "teacher", "student", "parent"] },
        { icon: "/result.png", label: "Results", href: "/list/resultsall", visible: ["admin", "teacher", "student", "parent"] },
        { icon: "/attendance.png", label: "Attendance", href: "/list/attendance", visible: ["admin", "teacher", "student", "parent"] },
        { icon: "/calendar.png", label: "Events", href: "/list/event", visible: ["admin", "teacher", "student", "parent"] },
        { icon: "/message.png", label: "Messages", href: "/list/messages", visible: ["admin", "teacher", "student", "parent"] },
        { icon: "/announcement.png", label: "Announcements", href: "/list/allannouncementforstudent", visible: ["admin", "teacher", "student", "parent"] },
      ],
    },
  ];

  return (
    <div className="space-y-6 flex">
      {menuItems.map((menu, index) => (
        <div key={index} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">{menu.title}</h2>
          <ul className="space-y-3">
            {menu.items.map((item, idx) => (
              item.visible.includes(userRole) && (
                <li key={idx} className="flex items-center gap-4">
                  <a href={item.href} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                    <img src={item.icon} alt={item.label} className="w-6 h-6" />
                    <span className="text-gray-700">{item.label}</span>
                  </a>
                </li>
              )
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Menu;
