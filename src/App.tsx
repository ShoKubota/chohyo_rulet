import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import '@freee_jp/vibes/css';
import { Button, Container, Header, HStack, CardBase, SectionTitle, Text, MessageDialog } from '@freee_jp/vibes'

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentImage, setCurrentImage] = useState('initial_image.png');
  const [wonNumbers, setWonNumbers] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  let images = Array.from({ length: 75 }, (_, i) => `${i + 1}.png`);
  images = images.filter(image => !wonNumbers.includes(image.split('.')[0]));  // Exclude already selected images

  // Switch images randomly
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setCurrentImage(randomImage);
      }, 100);
    }

    return () => clearTimeout(timer);  // Clean up to prevent memory leak
  }, [isRunning, images]);

  const handleStopStart = () => {
      if (isRunning) {
          let wonNumber = currentImage.split('.')[0];
          setWonNumbers([...wonNumbers, wonNumber]);
          setIsOpen(true);
      }
      setIsRunning(!isRunning);
  };

  return (
    <div className="App">
      <Header disableGutters sectionDataList={[]} logo={logo} />
      <Container width='wide'>
        <HStack justifyContent='center' alignItems='center'>
          <img src={currentImage}/>
        </HStack>
        <Button mt={2} primary large onClick={handleStopStart}>
          {isRunning ? "Stop" : "Start"}
        </Button>
        <CardBase mt={1} mb={1}>
          <SectionTitle>今まででた番号</SectionTitle>
          {wonNumbers.map((number,index) => (
            <Text size={1.5} weight='bold' key={index}>{number}, </Text>
          ))}
        </CardBase>
        <MessageDialog
          title="当たった番号"
          onRequestClose={() => setIsOpen(false)}
          closeButtonLabel="閉じる"
          isOpen={isOpen}
        >
          <Text>当たりました！</Text>
          <br/>
          <Text size={1} weight='bold'>番号 : {wonNumbers[wonNumbers.length - 1]}</Text>
        </MessageDialog>
      </Container>
    </div>
  );
}

export default App;
