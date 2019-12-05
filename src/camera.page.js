import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';



import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';

export default function CameraPage() {
    camera = null;

    // state = {
    //     captures: [],
    //     capturing: null,
    //     hasCameraPermission: null,
    //     cameraType: Camera.Constants.Type.back,
    //     flashMode: Camera.Constants.FlashMode.off,
    // };
    [captures, setCaptures] = useState([]);
    [capturing, setCapturing] = useState(null);
    [cameraPermission, setCameraPermission] = useState(null);
    [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);


    // setFlashMode = (flashMode) => this.setState({ flashMode });
    // setCameraType = (cameraType) => this.setState({ cameraType });
    // handleCaptureIn = () => this.setState({ capturing: true });

    // handleCaptureOut = () => {
    //     if (this.state.capturing)
    //         this.camera.stopRecording();
    // };

    // handleShortCapture = async () => {
    //     const photoData = await this.camera.takePictureAsync();
    //     this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    // };

    // handleLongCapture = async () => {
    //     const videoData = await this.camera.recordAsync();
    //     this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    // };

    const handleCaptureIn = () => {
        setCapturing(true);
    };
  
    const handleCaptureOut = () => {
      if (capturing)
          cam.stopRecording();
    };
  
    const handleShortCapture = async () => {
        const photoData = await cam.takePictureAsync();
        setCapturing(false);
        setCaptures([photoData, ...captures]);
    };
  
    const handleLongCapture = async () => {
        const videoData = await cam.recordAsync();
        setCapturing(false);
        setCaptures([videoData, ...captures]);
    };
  
    useEffect(() => {
          const hook = async () => {
          const camera = await Permissions.askAsync(Permissions.CAMERA);
          const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
          setCameraPermission(camera.status === 'granted' && audio.status === 'granted');
        };
        hook();
      }, []);
  

    // async componentDidMount() {
    //     const camera = await Permissions.askAsync(Permissions.CAMERA);
    //     const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    //     const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

    //     this.setState({ hasCameraPermission });
    // };

    if (cameraPermission === null) {
        return <View />;
    } else if (cameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }
    return (
    <React.Fragment>
        <View>
        <Camera
          type={cameraType}
          flashMode={flashMode}
          style={styles.preview}
          ref={camera => cam = camera}
        />
        </View>
        {captures.length > 0 && <Gallery captures={captures}/>}
        <Toolbar 
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={setFlashMode}
          setCameraType={setCameraType}
          onCaptureIn={handleCaptureIn}
          onCaptureOut={handleCaptureOut}
          onLongCapture={handleLongCapture}
          onShortCapture={handleShortCapture}
        />
    </React.Fragment>
    );
  }
  