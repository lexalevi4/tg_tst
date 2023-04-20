import  ModalClose  from "@mui/joy/ModalClose";
import  Divider  from "@mui/material/Divider";

function StatPlotModalContent({ filename = '', closeStatPlotModal, second = '' }) {
    return (
        <>
            <ModalClose
                onClick={closeStatPlotModal}
                variant="outlined"
                sx={{
                    top: 'calc(-1/4 * var(--IconButton-size))',
                    right: 'calc(-1/4 * var(--IconButton-size))',
                    boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                    borderRadius: '50%',
                    bgcolor: 'background.body',
                }}
            />
            <img
                // className='m-2 mb-5'
                style={{
                    m: 3,
                    width: '93vw',
                    // height: '40vh',
                }}
                alt={'stat_plot'}
                src={'https://img.pyxi.pro/stat/img/static/' + filename}
            />
            <Divider
            className="my-4"
            />
            <img
                // className='m-2 mb-5'
                style={{
                    m: 3,
                    width: '93vw',
                    // height: '40vh',
                }}
                alt={'stat_plot'}
                src={'https://img.pyxi.pro/stat/img/static/' + second}
            />
        </>
    );
}

export default StatPlotModalContent;