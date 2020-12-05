import React from 'react';

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

export default function CustomizedDialogs(props: any) {
  // const { open, dragon, onClose } = props;
  // const { title, author, description, image_url } = dragon;

  // const handleClose = () => {
  //   onClose(false);
  // };

  return (
    <div>
    
  
  <div className='movie_card' id='ave'>
    <div className='info_section'>
      <div className='movie_header'>
        <img className='locandina' src='https://mr.comingsoon.it/imgdb/locandine/235x336/53715.jpg'/>
        <h1>roror</h1>
        <h4>2018-12-23</h4>
        <span className='minutes'>dsdsdmin</span>
      
      </div>
      <div className='movie_desc'>
        <p className='text'>
        
        </p>
      </div>
      <div className='movie_social'>
        <ul>
          <li><i className='material-icons'>edit</i></li>     
          <li><i className='material-icons'>delete</i></li>
        </ul>
      </div>
    </div>
    <div className='blur_back ave_back'></div>
  </div>
  </div>
  );
}
