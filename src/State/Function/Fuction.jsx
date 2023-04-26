export const handleOpenCard = (setOpen, open) => {
  setOpen({
    ...open,
    profileCard: true,
  });
};
export const handleCloseCard = (setOpen, open) => {
  setOpen({
    ...open,
    profileCard: false,
  });
};
export const handleOpenInfo = (setOpen, open) => {
  setOpen({
    ...open,
    profileInfo: true,
  });
};
export const handleCloseInfo = (setOpen, open) => {
  setOpen({
    ...open,
    profileInfo: false,
  });
};
export const handleOpenCreate = (setOpen, open) => {
  setOpen({
    ...open,
    createModal: true,
  });
};
export const handleCloseCreate = (setOpen, open) => {
  setOpen({
    ...open,
    createModal: false,
  });
};
export const handleOpenComment = (setOpen, open) => {
  setOpen({
    ...open,
    commentModal: true,
  });
};
export const handleCloseComment = (setOpen, open) => {
  setOpen({
    ...open,
    commentModal: false,
  });
};
