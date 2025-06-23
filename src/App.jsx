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

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />} />

      <Route
        path="/"
        element={
          <ProtectRoute>
            <MainLayout />
          </ProtectRoute>
        }
      >
        <Route index element={<HomePage />} />

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

        {/* not found route */}
        <Route path="*" element={<NotFoundPage />} />

        {/* test route */}
        <Route path="/text-image-upload" element={<ImageUploader />} />
      </Route>
    </Routes>
  );
};

export default App;
