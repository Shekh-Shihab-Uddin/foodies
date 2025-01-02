import Swal from "sweetalert2";

const Toast = async ({ type, title }) => {
  await Swal.fire({
    position: "top",
    icon: type,
    title: title,
    showConfirmButton: false,
    toast: true,
    timer: 1500,
  });
};

export default Toast;
