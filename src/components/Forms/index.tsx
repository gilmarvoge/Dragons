import React from 'react';
import dragon from '../../assets/dragon.jpg';
import './styles.css';

// const styles = (theme: Theme) =>
//   createStyles({
//     root: {
//       margin: 0,
//       padding: theme.spacing(2),
//     },
//     closeButton: {
//       position: 'absolute',
//       right: theme.spacing(1),
//       top: theme.spacing(1),
//       color: theme.palette.grey[500],
//     },
//   });

// export interface DialogTitleProps extends WithStyles<typeof styles> {
//   id: string;
//   children: React.ReactNode;
//   onClose: () => void;
// }

// const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
//   const { children, classNamees, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography classNameName={classNamees.root} {...other}>
//       <Typography variant='h6'>{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label='close' classNameName={classNamees.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme: Theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

export default function Forms(props: any) {
  const { children} = props;

  return (
    <div id='form' >
     {children}
    </div>
  );
}
