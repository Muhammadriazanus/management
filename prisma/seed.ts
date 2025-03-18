import { askedMe, role } from "@/lib/data";
import { Day, PrismaClient, UserSex, ColorTheme } from "@prisma/client";
// import { parentsData } from "@/lib/data";
const prisma = new PrismaClient();


async function main() {
  // ADMIN
  for (let i = 1; i <= 2; i++) {
    await prisma.admin.create({
      data: {
        id: `admin${i}`,
        username: `admin${i}`,
        password: "defaultPassword",
        roles: `roles${i}`,
        // created_at : new Date() 
      },
    });
  }

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: {
        level: i,
        tenant_id: i
      },
    });
  }

  // CLASS
  for (let i = 1; i <= 6; i++) {
    await prisma.class.create({
      data: {
        name: `${i}A`,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
        grade_id: i,
        tenant_id: i


      },
    });
  }

  // SUBJECT
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
  ];

  const tenant_id = 1; // Define the tenant_id properly

  for (const name of subjects) {
    await prisma.subject.create({
      data: {
        tenant_id, // Corrected variable reference
        name,
      },
    });
  }

  // TEACHER
  for (let i = 1; i <= 15; i++) {
    await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        blood_type: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: (i % 10) + 1 }] },
        classes: { connect: [{ id: (i % 6) + 1 }] },
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
        tenant_id: i

      },
    });
  }

  // LESSON
  const days = Object.keys(Day) as Array<keyof typeof Day>;
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[days[Math.floor(Math.random() * days.length)]],
        class_id: (i % 6) + 1,
        end_time: new Date(new Date().setHours(10, 0, 0)),
        start_time: new Date(new Date().setHours(8, 0, 0)),
        subject_id: (i % 10) + 1,
        teacher_id: `teacher${(i % 15) + 1}`,
        tenant_id: i,
      },
    });
    // console.log("🚀 ~ main ~ data:", data)
  }

  // PARENT
  for (let i = 1; i <= 25; i++) {
    await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parentId${i}`,
        name: `PName${i}`,
        surname: `PSurname${i}`,
        email: `parent${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        tenant_id: i,
      },
    });
  }

  // STUDENT
  for (let i = 1; i <= 50; i++) {
    await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
        blood_type: "O-",
        grade_id: (i % 6) + 1,
        parent_id: `parentId${Math.ceil(i / 2)}`,
        class_id: (i % 6) + 1,
        tenant_id: i
      },
    });
  }

  // EXAM
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        start_time: new Date(new Date().setHours(9, 0, 0)),
        end_time: new Date(new Date().setHours(11, 0, 0)),
        lesson_id: (i % 30) + 1,
        tenant_id: i
      },
    });
  }

  // ASSIGNMENT
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        due_date: new Date(new Date().setDate(new Date().getDate() + 7)),
        start_date: new Date(),
        lesson_id: (i % 30) + 1,
        tenant_id: i
      },
    });
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: Math.floor(Math.random() * 101),
        student_id: `student${i}`,
        ...(i <= 5 ? { exam_id: i } : { assignment_id: i - 5 }),
        tenant_id: i
      },
    });
  }


  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        student_id: `student${i}`,
        lesson_id: (i % 30) + 1,
        tenant_id: i
      }
    })
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        class_id: (i % 5) + 1,
        start_time: new Date(new Date().setHours(10, 0, 0)),
        end_time: new Date(new Date().setHours(12, 0, 0)),
        tenant_id: i
      },
    });
  }
  for (let i = 1; i <= 3; i++) {
    try {
      await prisma.askedMe.create({
        data: {
          question: `Question${i}`,
          search_text: `searchText${i}`,
          tenant_id: i,
          start_time: new Date(), // Provide valid values for startTime and endTime
          end_time: new Date(new Date().getTime() + 3600000),
          // Example: 1 hour after startTime
        },
      });
      console.log(`Record ${i} created successfully.`);
    } catch (error) {
      console.error(`Error creating record ${i}:`, error);
    }
  }



  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        class_id: (i % 5) + 1,
        tenant_id: i
      },
    });
  }
  for (let i = 1; i <= 2; i++) {
    await prisma.superAdmin.create({
      data: {
        super_admin: false,
      },
    });
  }
  for (let i = 1; i <= 1; i++) {
    await prisma.color_Model.create({
      data: {
        tenant_id: i,
        primary: "#4CAF50",
        secondary: "#FFC107",
        background: "#4CAF50",
        color: "#FFFFFF",
        surface: "#FFFFFF",
        text: "#333333",
        border: "#E0E0E0"
      }
    })
  }
  const colors = Object.values(ColorTheme) as ColorTheme[];
  for (let i = 1; i <= 1; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    await prisma.tenant.create({
      data: {
        name: `anas${i}`,
        slug: `Description for  anas`,
        logo_url: `www.${i}.com`,
        default_language_code: `default_language_code`,
        status: "teacher",
        super_admin_id: i,
        value_text: `value_text for user`,
        color_theme: randomColor,
        img_url: `https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg${i}`,
      },
    });
  }


  // const colors = Object.values(ColorTheme) as ColorTheme[];

  // for (let i = 1; i <= 1; i++) {
  //   const randomColor = colors[Math.floor(Math.random() * colors.length)];

  //   await prisma.configuration.create({
  //     data: {

  //       color_theme: randomColor, 
  //       tenant_id: i,

  //     },
  //   });
  // }
  for (let i = 1; i <= 1; i++) {
    await prisma.registerSchool.create({
      data: {
        name: `bahira Model school${i}`,
        teacher: `muhammad anas ${i}`,
        address: `nazimabad no ${i}`,
        phone_number: `03422155047${i}`
      },
    });
  }
  for (let i = 1; i <= 1; i++) {
    await prisma.feeCategory.create({
      data: {
        name: `Anas${i}`,
      },
    });
  }
  
  for (let i = 1; i <= 1; i++) {
    await prisma.feeStructure.create({
      data: {
        categoryId: i,
        classes: `X${i}`,
        amount: `400${i}`,
      },
    });
  }
  
  // Pehle StudentFee create karein
  for (let i = 1; i <= 1; i++) {
    await prisma.studentFee.create({
      data: {
        feeId: i, // Ensure this fee structure exists
        studentId: "student1", // Ensure this student exists
        status: `OVERDUE`,
        dueDate: new Date(),
      },
    });
  }
  
  // Ab Payment create karein (kyunki ab studentFeeId available hai)
  for (let i = 1; i <= 1; i++) {
    await prisma.payment.create({
      data: {
        studentFeeId: i, // Ab ye foreign key valid hogi
        amount: `${i}`,
        paymentDate: new Date(),
        method: `BANK_TRANSFER`,
      },
    });
  }
  
  // for (let i = 1; i <= 1; i++) {
  //   await prisma.user.create({
  //     data: {
  //       name : `${name}`,
  //       img :   ""
  //     }
  //   })
  // }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
