import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectRoute from "./ProtectRoute";
import HomePage from "./pages/HomePage";
import StudentAddPage from "./pages/students/StudentAddPage";
import StudentProfilePage from "./pages/students/StudentProfilePage";
import NoticePage from "./pages/notice/NoticePage";
import CreateNotice from "./pages/notice/CreateNotice";
import NoticeDetails from "./pages/notice/NoticeDetails";
import NoticeEdit from "./pages/notice/NoticeEdit";
import NoticeSmsSend from "./pages/notice/NoticeSmsSend";
import TeacherHomePage from "./pages/teachers/TeacherHomePage";
import StudentHomePage from "./pages/students/StudentHomePage";
import StudentListPage from "./pages/students/StudentListPage";
import TeacherAddPage from "./pages/teachers/TeacherAddPage";
import TeacherEditPage from "./pages/teachers/TeacherEditPage";
import StudentEditPage from "./pages/students/StudentEditPage";
import TeacherProfilePage from "./pages/teachers/TeacherProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ImageUploader from "./components/UploadImageTest";
import ExamAdmitFile from "./components/ExamAdmitFile";
import PDFTestForMobile from "./components/PDFTestForMobile";
import ExamAdmitCard from "./components/ExamAdmitCard";
import AdmitListPage from "./pages/exam/AdmitListPage";
import QRCodeGenerator from "./components/QRCodeGenerator";
import SitStiker from "./pages/exam/SitStiker";
import ExamPage from "./pages/exam/ExamPage";
import AddNewExam from "./pages/exam/AddNewExam";
import ResultPage from "./pages/Result/ResultPage";
import ResultUpdatePage from "./pages/Result/ResultUpdatePage";
import MakeQuestion from "./pages/make_questions/MakeQuestion";
import ResultMarkSheet from "./pages/Result/ResultMarkSheet";
import AdjustSheet from "./pages/test/AdjustSheet";
import CenterExaminationStudentListingSheet from "./pages/test/CenterExaminationStudentListingSheet";
import NewAdmissionStudentProfile from "./pages/students/NewAdmissionStudentProfile";
import NewAdmissionStudentList from "./pages/students/NewAdmissionStudentList";
import NewAdmissionStudentEdit from "./pages/students/NewAdmissionStudentEdit";
import RoutineModelTest from "./pages/test/RoutineModelTest";
import useResultsData from "./hook/useResultsData";
import { useEffect, useState } from "react";
import supabase from "./supabase/config";
import StudentSalarySheet from "./pages/StudentSalarySheet";
import MonthlyExam from "./pages/exam/monthlyExam/MonthlyExam";

const App = () => {
  // const { data: resultData, loading: resultLoading } = useResultsData();

  // const updateRollBaseResultPosition = async () => {
  //   const student = await supabase
  //     .from("students")
  //     .select("*")
  //     .order("roll", "desc");

  //   // const func = resultData.map((item) => {});

  //   // const studentdata = await supabase.from("students").upsert(func).select();

  //   console.log(resultData);
  // };

  // // useEffect(() => {
  // //   // console.log(resultLoading);
  // //   // if (resultLoading) {
  //   updateRollBaseResultPosition();
  // //   // }
  // // }, [resultLoading]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const start = performance.now(); // শুরু টাইম

  //     const { data, error } = await supabase.from("annual_exam_result").select("*");

  //     const end = performance.now(); // শেষ টাইম

  //     if (error) {
  //       console.error("Supabase Error:", error);
  //       return;
  //     }

  //     // ডাটার size মাপা
  //     const jsonString = JSON.stringify(data);
  //     const sizeInBytes = new TextEncoder().encode(jsonString).length;

  //     // Byte → KB / MB conversion
  //     const sizeKB = (sizeInBytes / 1024).toFixed(2);
  //     const sizeMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

  //     // console.log("Fetched data:", data);
  //     console.log(`Size: ${sizeInBytes} bytes | ${sizeKB} KB | ${sizeMB} MB`);
  //     console.log(`Request took ${((end - start)/1000).toFixed(2)} s`);
  //   };

  //   fetchData();
  // }, []);
  // const [data, setData] = useState([]);

  // const getStudentsByClass = async () => {
  //   // setDataLoading(true);

  //   let query = supabase
  //     .from("students")
  //     .select(`studentName`)
  //     .eq("class_code", "2")
  //     .order("class_code", "desc")
  //     .order("roll", "desc");

  //   const { data, error } = await query;

  //   if (error) {
  //     console.log(error);
  //   } else {
  //     setData(data.map((d) => d.studentName));
  //   }

  //   // setDataLoading(false);
  // };

  // useEffect(() => {
  //   getStudentsByClass();
  // }, []);

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />} />

      {/* <Route
        index
        element={
          <>
            {data.map((d) => (
              <p>{d}</p>
            ))}
          </>
        }
      /> */}

      <Route
        path="/"
        element={
          <ProtectRoute>
            <MainLayout />
          </ProtectRoute>
        }
      >
        <Route index element={<HomePage />} />

        {/* admissions route */}
        <Route path="admission">
          <Route index element={<NewAdmissionStudentList />} />
          <Route path="new" element={<StudentAddPage />} />
          <Route
            path="student/:student_id"
            element={<NewAdmissionStudentProfile />}
          />
          <Route
            path="student/edit/:student_id"
            element={<NewAdmissionStudentEdit />}
          />
        </Route>

        {/* teachers route */}
        <Route path="teachers">
          <Route index element={<TeacherHomePage />} />
          <Route path="profile" element={<TeacherProfilePage />} />
          <Route path="add" element={<TeacherAddPage />} />
          <Route path="edit/:teacher_id" element={<TeacherEditPage />} />
        </Route>

        {/* students route */}
        <Route path="students">
          <Route index element={<StudentHomePage />} />
          <Route path="add" element={<StudentAddPage />} />
          <Route path="edit/:student_id" element={<StudentEditPage />} />
          <Route path=":class_id" element={<StudentListPage />} />
          <Route
            path=":class_id/:student_id"
            element={<StudentProfilePage />}
          />
        </Route>

        {/* notice route */}
        <Route path="notice">
          <Route index element={<NoticePage />} />
          <Route path="create" element={<CreateNotice />} />
          <Route path="edit/:notice_id" element={<NoticeEdit />} />
          <Route path=":notice_id" element={<NoticeDetails />} />
          <Route
            path="send-sms/:notice_id/:class_id"
            element={<NoticeSmsSend />}
          />
        </Route>

        {/* exams */}
        <Route path="exams">
          <Route index element={<ExamPage />} />
          <Route path="create" element={<AddNewExam />} />
        </Route>

        {/* test primary label route */}
        <Route path="results">
          <Route index element={<ResultPage />} />
          <Route path="update" element={<ResultUpdatePage />} />
        </Route>

        {/* not found route */}
        <Route path="*" element={<NotFoundPage />} />

        {/* test route */}
        <Route path="/text-image-upload" element={<ImageUploader />} />
        <Route path="/test-pdf" element={<ExamAdmitFile />} />
        <Route path="/test-pdf-mobile" element={<PDFTestForMobile />} />
      </Route>
      <Route path="/results/mark-sheets" element={<ResultMarkSheet />} />
      <Route path="/admit-card" element={<ExamAdmitCard />} />
      <Route path="/admit-list" element={<AdmitListPage />} />
      <Route path="/sit-sticker" element={<SitStiker />} />
      <Route path="/qr" element={<QRCodeGenerator />} />
      <Route path="/make-questions" element={<MakeQuestion />} />

      {/* Test Route */}
      <Route path="/test">
        <Route path="adjust-sheet" element={<AdjustSheet />} />
        <Route
          path="center-exam"
          element={<CenterExaminationStudentListingSheet />}
        />
        <Route path="routine-model" element={<RoutineModelTest />} />
        <Route path="student-salary-sheet" element={<StudentSalarySheet />} />
        <Route path="exam-monthly" element={<MonthlyExam />} />
      </Route>
    </Routes>
  );
};

export default App;
