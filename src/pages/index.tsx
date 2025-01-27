import { Container, Title, Text, Button, SimpleGrid, Card, List, Group, Flex } from "@mantine/core";  
import { IconCoin, IconCode, IconFingerprint, IconChartPie3, IconBook, IconTools, IconUser, IconHelp, IconCheck } from "@tabler/icons-react";  
import Link from "next/link";  
import { theme } from "./theme";

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
      <svg viewBox="0 0 1440 320" style={{ display: 'block', width: '100%', height: 'auto' }}>  
        <path fill={theme.colors.blue[0]} d="M0,128L30,144C60,160,120,192,180,202.7C240,213,300,203,360,186.7C420,171,480,149,540,144C600,139,660,149,720,160C780,171,840,181,900,186.7C960,192,1020,192,1080,186.7C1140,181,1200,171,1260,160C1320,149,1380,139,1410,134.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0Z"></path>  
      </svg>  

      {/* Explore Tools Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center', backgroundColor: theme.colors.blue[0] }}  
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
      <svg viewBox="0 0 1440 320" style={{ display: 'block', width: '100%', height: 'auto' }}>  
        <path fill="#f0f4ff" d="M0,128L30,144C60,160,120,192,180,202.7C240,213,300,203,360,186.7C420,171,480,149,540,144C600,139,660,149,720,160C780,171,840,181,900,186.7C960,192,1020,192,1080,186.7C1140,181,1200,171,1260,160C1320,149,1380,139,1410,134.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0Z"></path>  
      </svg>  

      {/* Why Choose Us Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center', backgroundColor: '#ffffff' }}  
      >  
        <Title order={2} style={{ fontWeight: 600, fontSize: '2.5rem', color: '#1a1b1e' }}>Why Choose Us?</Title>  
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
      <svg viewBox="0 0 1440 320" style={{ display: 'block', width: '100%', height: 'auto' }}>  
        <path fill="#f0f4ff" d="M0,128L30,144C60,160,120,192,180,202.7C240,213,300,203,360,186.7C420,171,480,149,540,144C600,139,660,149,720,160C780,171,840,181,900,186.7C960,192,1020,192,1080,186.7C1140,181,1200,171,1260,160C1320,149,1380,139,1410,134.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0Z"></path>  
      </svg>  

      {/* User Testimonials Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center', backgroundColor: '#f0f4ff' }}  
      >  
        <Title order={2} style={{ fontWeight: 600, fontSize: '2.5rem', color: '#1a1b1e' }}>User Testimonials</Title>  
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
      <svg viewBox="0 0 1440 320" style={{ display: 'block', width: '100%', height: 'auto' }}>  
        <path fill="#ffffff" d="M0,128L30,144C60,160,120,192,180,202.7C240,213,300,203,360,186.7C420,171,480,149,540,144C600,139,660,149,720,160C780,171,840,181,900,186.7C960,192,1020,192,1080,186.7C1140,181,1200,171,1260,160C1320,149,1380,139,1410,134.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0Z"></path>  
      </svg>  

      {/* Join Our Community Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center', backgroundColor: '#ffffff' }}  
      >  
        <Title order={2} style={{ fontWeight: 600, fontSize: '2.5rem', color: '#1a1b1e' }}>Join Our Community</Title>  
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
      <svg viewBox="0 0 1440 320" style={{ display: 'block', width: '100%', height: 'auto' }}>  
        <path fill="#f0f4ff" d="M0,128L30,144C60,160,120,192,180,202.7C240,213,300,203,360,186.7C420,171,480,149,540,144C600,139,660,149,720,160C780,171,840,181,900,186.7C960,192,1020,192,1080,186.7C1140,181,1200,171,1260,160C1320,149,1380,139,1410,134.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0Z"></path>  
      </svg>  

      {/* Get in Touch Section */}  
      <Flex  
        direction="column"  
        align="center"  
        justify="center"  
        style={{ height: '100vh', textAlign: 'center', backgroundColor: '#f0f4ff' }}  
      >  
        <Title order={2} style={{ fontWeight: 600, fontSize: '2.5rem', color: '#1a1b1e' }}>Get in Touch</Title>  
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