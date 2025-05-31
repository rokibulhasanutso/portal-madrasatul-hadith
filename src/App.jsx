import AuthLayout from "./layouts/AuthLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectRoute from "./ProtectRoute";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import StudentAddPage from "./pages/StudentAddPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import StudentEditPage from "./pages/StudentEditPage";
import NoticePage from "./pages/notice/NoticePage";
import CreateNotice from "./pages/notice/CreateNotice";
import NoticeDetails from "./pages/notice/NoticeDetails";
import NoticeEdit from "./pages/notice/NoticeEdit";
import StudentList from "./pages/students/StudentList";
import NoticeSmsSend from "./pages/notice/NoticeSmsSend";

const App = () => {
  return (
    <BrowserRouter>
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
          <Route path="students">
            <Route index element={<StudentPage />} />
            <Route path="add" element={<StudentAddPage />} />
            <Route path="edit/:student_id" element={<StudentEditPage />} />
            <Route path=":class_id" element={<StudentList />} />
            <Route
              path=":class_id/:student_id"
              element={<StudentProfilePage />}
            />
          </Route>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
