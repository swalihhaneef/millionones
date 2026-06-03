import ReactPlayer from 'react-player';

const VideoPlayer = ({vedio,onReady}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ReactPlayer
        url={`${vedio}`}
        controls={false}
        playing={onReady}
        muted={true}
        loop={true}
        onReady={false}
        width="100%"
        height="100%"
        className='react-player'
        style={{border:'none'}}
        // style={{minHeight:"100vh"}}  
      />
    </div>
  );
};

export default VideoPlayer;
