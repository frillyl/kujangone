import Swal from "sweetalert2";

const getCSSVar = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    customClass: {
        popup: "rounded-xl shadow-lg font-medium",
    },
});

/**
 * @param {"success"|"error"|"warning"|"info"} type - Jenis Notifikasi
 * @param {string} message - Pesan yang ingin ditampilkan
 */

export const showToast = (type, message) => {
    const themeIsDark = document.documentElement.classList.contains("dark");
    const bg = themeIsDark ? getCSSVar("--color-secondary-dark") : getCSSVar("--color-secondary-light");
    const text = themeIsDark ? getCSSVar("--color-text-dark") : getCSSVar("--color-text-light");

    Toast.fire({
        icon: type,
        title: message,
        background: bg,
        color: text,
    });
};

/**
 * @param {string} title - Judul Dialog
 * @param {string} text - Pesan Tambahan
 * @param {string} confirmText - Teks Tombol Konfirmasi
 * @param {string} icon - Jenis Icon (Warning, Question, Info, Error, Success)
 * @returns {Promise<boolean>} - True Jika User Menekan Konfirmasi
 */

export const showConfirmDialog = async (
    title = "Yakin?",
    text = "Tindakan ini tidak dapat dibatalkan!",
    confirmText = "Ya, lanjutkan",
    icon = "warning"
) => {
    const themeIsDark = document.documentElement.classList.contains("dark");

    const bg = themeIsDark ? getCSSVar("--color-background-dark") : getCSSVar("--color-background-light");
    const color = themeIsDark ? getCSSVar("--color-text-dark") : getCSSVar("--color-text-light");

    const confirmColor = {
        success: getCSSVar("--color-success-base"),
        warning: getCSSVar("--color-warning-base"),
        error: getCSSVar("--color-danger-base"),
        info: getCSSVar("--color-info-base"),
        question: getCSSVar("--color-primary-light"),
    } [icon] || getCSSVar("--color-primary-light");

    const cancelColor = themeIsDark ? getCSSVar("--color-line-dark") : getCSSVar("--color-line-light");

    const result = await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: "Batal",
        reverseButtons: true,
        background: bg,
        color,
        confirmButtonColor: confirmColor,
        cancelButtonColor: cancelColor,
        customClass: {
            popup: "rounded-2xl shadow-lg font-medium",
            confirmButton: "px-4 py-2",
            cancelButton: "px-4 py-2",
        },
    });
    return result.isConfirmed;
}