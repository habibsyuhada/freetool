import { Container, Title, Text, Button, SimpleGrid, Card, List, Group, Flex } from "@mantine/core";  
import { IconCoin, IconCode, IconFingerprint, IconChartPie3, IconBook, IconTools, IconUser, IconHelp, IconCheck } from "@tabler/icons-react";  
import Link from "next/link";  
import { theme } from "./theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";

const tools = [  
  {  
    icon: IconCoin,  
    title: "Currency & Salary Converter",  
    description: "Convert currencies and salaries with ease. Get real-time exchange rates and make informed financial decisions.",  
    link: "/currency-salary-converter",  
  },  
  {  
    icon: IconCode,  
    title: "Task Management",  
    description: "Manage your tasks efficiently with our intuitive task management tool. Organize, prioritize, and track your progress.",  
    link: "#",  
  },  
  {  
    icon: IconBook,  
    title: "Cut URL",  
    description: "Shorten your URLs quickly and easily. Share links without clutter and track their performance.",  
    link: "#",  
  },  
  {  
    icon: IconFingerprint,  
    title: "Encoder & Decoder",  
    description: "Encode and decode text securely. Protect sensitive information with our easy-to-use tool.",  
    link: "#",  
  },  
  {  
    icon: IconChartPie3,  
    title: "QR Code Generator",  
    description: "Generate QR codes for any link. Perfect for marketing materials, business cards, and more.",  
    link: "#",  
  },  
  {  
    icon: IconTools,  
    title: "Image Compressor",  
    description: "Reduce image file sizes without losing quality. Optimize your images for faster loading times.",  
    link: "#",  
  },  
  {  
    icon: IconUser,  
    title: "User Feedback Tool",  
    description: "Collect user feedback effortlessly. Improve your services based on real user insights.",  
    link: "#",  
  },  
  {  
    icon: IconHelp,  
    title: "Help & Support",  
    description: "Need assistance? Our help center provides answers to common questions and support resources.",  
    link: "#",  
  },  
];  

const testimonials = [  
  {  
    name: "John Doe",  
    feedback: "FreeTool has transformed the way I manage my tasks. It's incredibly user-friendly!",  
  },  
  {  
    name: "Jane Smith",  
    feedback: "The currency converter is a lifesaver for my travels. Highly recommend!",  
  },  
  {  
    name: "Alice Johnson",  
    feedback: "I love the variety of tools available. They save me so much time!",  
  },  
];  

const HomePage = () => {   
  const themeApp = useSelector((state: RootState) => state.theme.theme);
  let bgColor = themeApp === 'light' ? '#f0f4ff' : '#1a1b1e';

  useEffect(() => {
    console.log("themeApp", bgColor);
  }, [themeApp]);

  return (  
    <Container fluid style={{ padding: 0 }}>  
      {/* Welcome Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center' }}  
      >  
        <Title order={1} style={{ fontWeight: 700, fontSize: '3rem' }}>  
          Welcome to FreeTool  
        </Title>  
        <Text size="lg" mt="sm">  
          Your one-stop solution for various online tools to simplify your tasks.  
        </Text>  
      </Flex>  

      {/* Wave Divider */} 
      <svg style={{ display: 'block', width: '100%', height: 'auto' }} viewBox="0 0 1440 320"><path fill={bgColor} fill-opacity="1" d="M0,96L120,122.7C240,149,480,203,720,218.7C960,235,1200,213,1320,202.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>

      {/* Explore Tools Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center', backgroundColor: bgColor }}  
      >  
        <Title order={2} style={{ fontWeight: 600, fontSize: '2.5rem', color: '#1a1b1e' }}>Explore Our Tools</Title>  
        <Text size="md" mb="lg" color="dimmed">  
          We offer a variety of tools designed to help you with everyday tasks. Whether you need to convert currencies, manage tasks, or generate QR codes, we have you covered!  
        </Text>  
        <SimpleGrid cols={4} spacing="lg" mt="xl">  
          {tools.map((tool) => (  
            <Card key={tool.title} shadow="sm" padding="lg" radius="md" withBorder>  
              <Card.Section>  
                <tool.icon size={40} color="#007bff" />  
              </Card.Section>  
              <Title order={3} mt="md">{tool.title}</Title>  
              <Text size="sm" color="dimmed">{tool.description}</Text>  
              <Link href={tool.link} passHref>  
                <Button variant="outline" mt="md">Try it now</Button>  
              </Link>  
            </Card>  
          ))}  
        </SimpleGrid>  
      </Flex>  

      {/* Wave Divider */}  
      <svg style={{ display: 'block', width: '100%', height: 'auto' }} viewBox="0 0 1440 320"><path fill={bgColor} fill-opacity="1" d="M0,64L40,80C80,96,160,128,240,133.3C320,139,400,117,480,144C560,171,640,245,720,256C800,267,880,213,960,165.3C1040,117,1120,75,1200,64C1280,53,1360,75,1400,85.3L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

      {/* Why Choose Us Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center' }}  
      >  
        <Title order={2} style={{ fontWeight: 600, fontSize: '2.5rem' }}>Why Choose Us?</Title>  
        <Text size="md" mb="lg" color="dimmed">  
          Our tools are designed with user experience in mind. Here are a few reasons why you should choose FreeTool:  
        </Text>  
        <List spacing="sm" size="sm" center>  
          <List.Item icon={<IconCheck size={16} color="green" />}>User-friendly interface for easy navigation.</List.Item>  
          <List.Item icon={<IconCheck size={16} color="green" />}>Fast and reliable performance.</List.Item>  
          <List.Item icon={<IconCheck size={16} color="green" />}>Regular updates and new features based on user feedback.</List.Item>  
          <List.Item icon={<IconCheck size={16} color="green" />}>Completely free to use with no hidden charges.</List.Item>  
        </List>  
      </Flex>  

      {/* Wave Divider */}  
      <svg style={{ display: 'block', width: '100%', height: 'auto' }} viewBox="0 0 1440 320"><path fill={bgColor} fill-opacity="1" d="M0,64L40,53.3C80,43,160,21,240,58.7C320,96,400,192,480,202.7C560,213,640,139,720,90.7C800,43,880,21,960,21.3C1040,21,1120,43,1200,69.3C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>

      {/* User Testimonials Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center', backgroundColor: bgColor }}  
      >  
        <Title order={2} style={{ fontWeight: 600, fontSize: '2.5rem' }}>User Testimonials</Title>  
        <Text size="md" mb="lg" color="dimmed">  
          Hear what our users have to say about FreeTool:  
        </Text>  
        <SimpleGrid cols={3} spacing="lg">  
          {testimonials.map((testimonial, index) => (  
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>  
              <Text size="sm" italic>"{testimonial.feedback}"</Text>  
              <Text align="right" size="sm" weight={500} mt="md">- {testimonial.name}</Text>  
            </Card>  
          ))}  
        </SimpleGrid>  
      </Flex>  

      {/* Wave Divider */}
      <svg style={{ display: 'block', width: '100%', height: 'auto' }} viewBox="0 0 1440 320"><path fill={bgColor} fill-opacity="1" d="M0,96L40,117.3C80,139,160,181,240,202.7C320,224,400,224,480,208C560,192,640,160,720,138.7C800,117,880,107,960,117.3C1040,128,1120,160,1200,154.7C1280,149,1360,107,1400,85.3L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

      {/* Join Our Community Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center' }}  
      >  
        <Title order={2} style={{ fontWeight: 600, fontSize: '2.5rem' }}>Join Our Community</Title>  
        <Text size="md" mb="lg" color="dimmed">  
          Sign up today to access exclusive features and stay updated with the latest tools and updates.  
        </Text>  
        <Group position="center">  
          <Link href="/signup" passHref>  
            <Button size="lg">Sign Up</Button>  
          </Link>  
          <Link href="/login" passHref>  
            <Button size="lg" variant="outline">Log In</Button>  
          </Link>  
        </Group>  
      </Flex>  

      {/* Wave Divider */}
      <svg style={{ display: 'block', width: '100%', height: 'auto' }} viewBox="0 0 1440 320"><path fill={bgColor} fill-opacity="1" d="M0,160L60,149.3C120,139,240,117,360,138.7C480,160,600,224,720,213.3C840,203,960,117,1080,74.7C1200,32,1320,32,1380,32L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>

      {/* Get in Touch Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center', backgroundColor: bgColor }}  
      >  
        <Title order={2} style={{ fontWeight: 600, fontSize: '2.5rem' }}>Get in Touch</Title>  
        <Text size="md" mb="lg" color="dimmed">  
          Have questions or feedback? Reach out to us through our contact page.  
        </Text>  
        <Link href="/contact" passHref>  
          <Button variant="outline" size="lg">Contact Us</Button>  
        </Link>  
      </Flex>  

      <Text align="center" size="sm" color="dimmed" mt="lg">  
        &copy; {new Date().getFullYear()} FreeTool. All rights reserved.  
      </Text>  
    </Container>  
  );  
};  

export default HomePage;