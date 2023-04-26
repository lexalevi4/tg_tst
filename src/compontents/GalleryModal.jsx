import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

function GalleryModal({ gallery_modal_open, handleGalleryModal, images }) {

    if (!gallery_modal_open) {
        return (<></>)
    }

    return (

        <Dialog
            fullScreen
            open={gallery_modal_open}
            // keepMounted
            onClose={handleGalleryModal}
            scroll='paper'
        // TransitionComponent={Transition}
        >
            <AppBar
            position="fixed"

            sx={{ top: 0, bottom: 'auto' }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleGalleryModal}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>


            <div
                className='m-3 p-2 pt-5 pb-5'
                style={{
                    // marginBottom: 80,
                    marginTop: 10
                }}



            ></div>

            <ImageList variant="masonry" cols={1}
                // sx={{ width: '100vw', height: '80vh' }}
                style={{
                    marginBottom: '4rem',
                    overflowY: 'unset'
                }}
                // className="mb-5"
                // rows={1}
                gap={8}>
                {images.map((item) => (
                    <ImageListItem key={item.full}>
                        <img
                            // className="full_image"
                            style={{
                                minHeight: 200,
                                minWidth: '100vw'
                                // height:3000,
                                // width:2000


                            }}
                            src={item.full}
                            srcSet={item.full}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <div
                style={{
                    height: 100
                }}
            > </div>

        </Dialog>

    );
}

export default GalleryModal;