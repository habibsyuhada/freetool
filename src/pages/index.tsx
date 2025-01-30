import { Container, Title, Text, Button, SimpleGrid, Card, Group, Flex, Box, ThemeIcon, Rating } from "@mantine/core";
import { IconCoin, IconCode, IconFingerprint, IconChartPie3, IconBook, IconTools, IconUser, IconHelp, IconCheck, IconRocket, IconRefresh, IconQuote, IconUserPlus, IconLogin, IconMessage, IconClock, IconBrandTwitter, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { theme } from "../styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Layout from "@/components/layout/Layout";

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
    link: "/coming-soon",
  },
  {
    icon: IconBook,
    title: "Cut URL",
    description: "Shorten your URLs quickly and easily. Share links without clutter and track their performance.",
    link: "/coming-soon",
  },
  {
    icon: IconFingerprint,
    title: "Encoder & Decoder",
    description: "Encode and decode text securely. Protect sensitive information with our easy-to-use tool.",
    link: "/coming-soon",
  },
  {
    icon: IconChartPie3,
    title: "QR Code Generator",
    description: "Generate QR codes for any link. Perfect for marketing materials, business cards, and more.",
    link: "/coming-soon",
  },
  {
    icon: IconTools,
    title: "Image Compressor",
    description: "Reduce image file sizes without losing quality. Optimize your images for faster loading times.",
    link: "/coming-soon",
  },
  {
    icon: IconUser,
    title: "User Feedback Tool",
    description: "Collect user feedback effortlessly. Improve your services based on real user insights.",
    link: "/coming-soon",
  },
  {
    icon: IconHelp,
    title: "Help & Support",
    description: "Need assistance? Our help center provides answers to common questions and support resources.",
    link: "/coming-soon",
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
  const bgColor = themeApp === 'light' ? '#f0f4ff' : '#1a1b1e';

  return (
    <Layout title="Home" description="Welcome to FreeTool">
      <Container fluid style={{ padding: 0 }}>
        {/* Welcome Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            minHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <Box
            style={{
              animation: 'fadeIn 1s ease-in',
              maxWidth: '800px',
              padding: '2rem'
            }}
          >
            <Title
              order={1}
              style={{
                fontWeight: 800,
                fontSize: '4rem',
                background: 'linear-gradient(45deg, #228BE6 0%, #40C057 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem'
              }}
            >
              Welcome to FreeTool
            </Title>
            <Text
              size="xl"
              mt="xl"
              style={{
                lineHeight: 1.6,
                opacity: 0.8
              }}
            >
              Your one-stop solution for various online tools to simplify your tasks.
            </Text>
            <Group mt={40} justify="center">
              <Link href="/currency-salary-converter" passHref style={{ textDecoration: 'none' }}>
                <Button
                  size="xl"
                  variant="gradient"
                  gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/coming-soon" passHref style={{ textDecoration: 'none' }}>
                <Button
                  size="xl"
                  variant="outline"
                  color="blue"
                >
                  Learn More
                </Button>
              </Link>
            </Group>
          </Box>
        </Flex>

        {/* Wave Divider */}
        <svg style={{ display: 'block', width: '100%', height: 'auto', clear: 'both' }} viewBox="0 0 1440 320"><path fill={bgColor} fillOpacity="1" d="M0,96L120,122.7C240,149,480,203,720,218.7C960,235,1200,213,1320,202.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>

        {/* Explore Tools Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            minHeight: '100vh',
            textAlign: 'center',
            backgroundColor: bgColor,
          }}
          p={'md'}
        >
          <Box
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              animation: 'fadeIn 1s ease-in'
            }}
          >
            <Title
              order={2}
              style={{
                fontWeight: 800,
                fontSize: '3rem',
                marginBottom: '2rem',
                color: themeApp === 'dark' ? 'white' : '#1a1b1e',
                background: 'linear-gradient(45deg, #228BE6 0%, #40C057 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Explore Our Tools
            </Title>
            <Text
              size="xl"
              maw={600}
              mx="auto"
              mb={50}
              color="dimmed"
              style={{ lineHeight: 1.6 }}
            >
              Discover our powerful suite of tools designed to boost your productivity and simplify your workflow.
            </Text>
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing="xl"
              verticalSpacing="xl"
            >
              {tools.map((tool) => (
                <Card
                  key={tool.title}
                  shadow="sm"
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    ':hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Card.Section p="xl">
                    <ThemeIcon
                      size={60}
                      radius="md"
                      variant="gradient"
                      gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
                    >
                      <tool.icon size={30} />
                    </ThemeIcon>
                  </Card.Section>
                  <Title
                    order={3}
                    mt="md"
                    style={{
                      fontSize: '1.5rem',
                      color: themeApp === 'dark' ? 'white' : '#1a1b1e'
                    }}
                  >
                    {tool.title}
                  </Title>
                  <Text size="md" color="dimmed" mt="sm" mb="xl" style={{ lineHeight: 1.6 }}>
                    {tool.description}
                  </Text>
                  <Link href={tool.link} passHref style={{ textDecoration: 'none' }}>
                    <Button
                      variant="gradient"
                      gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
                      fullWidth
                      size="md"
                      mt="auto"
                    >
                      {tool.link === '/coming-soon' ? 'Coming Soon' : 'Try it now'}
                    </Button>
                  </Link>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>

        {/* Wave Divider */}
        <svg style={{ display: 'block', width: '100%', height: 'auto' }} viewBox="0 0 1440 320"><path fill={bgColor} fillOpacity="1" d="M0,64L40,80C80,96,160,128,240,133.3C320,139,400,117,480,144C560,171,640,245,720,256C800,267,880,213,960,165.3C1040,117,1120,75,1200,64C1280,53,1360,75,1400,85.3L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

        {/* Why Choose Us Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            minHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <Box
            style={{
              maxWidth: '800px',
              padding: '2rem',
              animation: 'fadeIn 1s ease-in'
            }}
          >
            <Title
              order={2}
              style={{
                fontWeight: 800,
                fontSize: '3rem',
                marginBottom: '2rem',
                background: 'linear-gradient(45deg, #228BE6 0%, #40C057 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Why Choose Us?
            </Title>
            <Text
              size="xl"
              mb={50}
              color="dimmed"
              style={{ lineHeight: 1.6 }}
            >
              Our tools are designed with user experience in mind. Here are a few reasons why you should choose FreeTool:
            </Text>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
              {[
                {
                  icon: IconCheck,
                  title: "User-Friendly Interface",
                  description: "Intuitive design for seamless navigation and enhanced user experience."
                },
                {
                  icon: IconRocket,
                  title: "Lightning Fast",
                  description: "Optimized performance ensuring quick and reliable tool operation."
                },
                {
                  icon: IconRefresh,
                  title: "Regular Updates",
                  description: "Continuous improvements and new features based on user feedback."
                },
                {
                  icon: IconCoin,
                  title: "Always Free",
                  description: "Access all tools without any cost or hidden charges."
                }
              ].map((item) => (
                <Card
                  key={item.title}
                  shadow="sm"
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    transition: 'transform 0.2s',
                    ':hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <ThemeIcon
                    size={50}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
                    mb="md"
                  >
                    <item.icon size={25} />
                  </ThemeIcon>
                  <Text size="lg" fw={600} mb="xs">{item.title}</Text>
                  <Text size="md" color="dimmed">{item.description}</Text>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>

        {/* Wave Divider */}
        <svg style={{ display: 'block', width: '100%', height: 'auto' }} viewBox="0 0 1440 320"><path fill={bgColor} fillOpacity="1" d="M0,64L40,53.3C80,43,160,21,240,58.7C320,96,400,192,480,202.7C560,213,640,139,720,90.7C800,43,880,21,960,21.3C1040,21,1120,43,1200,69.3C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>

        {/* User Testimonials Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            minHeight: '100vh',
            textAlign: 'center',
            backgroundColor: bgColor,
          }}
          p={'md'}
        >
          <Box
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              animation: 'fadeIn 1s ease-in'
            }}
          >
            <Title
              order={2}
              style={{
                fontWeight: 800,
                fontSize: '3rem',
                marginBottom: '2rem',
                background: 'linear-gradient(45deg, #228BE6 0%, #40C057 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              What Our Users Say
            </Title>
            <Text
              size="xl"
              maw={600}
              mx="auto"
              mb={50}
              color="dimmed"
              style={{ lineHeight: 1.6 }}
            >
              Don&apos;t just take our word for it. Here&apos;s what our community has to say about FreeTool:
            </Text>
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3 }}
              spacing="xl"
            >
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  shadow="sm"
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    transition: 'transform 0.2s',
                    ':hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <ThemeIcon
                    size={40}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
                    mb="xl"
                  >
                    <IconQuote size={20} />
                  </ThemeIcon>
                  <Text
                    size="lg"
                    style={{ lineHeight: 1.6, fontStyle: 'italic' }}
                    mb="xl"
                  >
                    &quot;{testimonial.feedback}&quot;
                  </Text>
                  <Group justify="space-between" mt="auto">
                    <Text
                      fw={600}
                      size="sm"
                      style={{
                        background: 'linear-gradient(45deg, #228BE6 0%, #40C057 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {testimonial.name}
                    </Text>
                    <Rating value={5} readOnly size="sm" />
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>

        {/* Wave Divider */}
        <svg style={{ display: 'block', width: '100%', height: 'auto' }} viewBox="0 0 1440 320"><path fill={bgColor} fillOpacity="1" d="M0,96L40,117.3C80,139,160,181,240,202.7C320,224,400,224,480,208C560,192,640,160,720,138.7C800,117,880,107,960,117.3C1040,128,1120,160,1200,154.7C1280,149,1360,107,1400,85.3L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

        {/* Join Our Community Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            minHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <Box
            style={{
              maxWidth: '800px',
              padding: '2rem',
              animation: 'fadeIn 1s ease-in'
            }}
          >
            <Title
              order={2}
              style={{
                fontWeight: 800,
                fontSize: '3rem',
                marginBottom: '2rem',
                background: 'linear-gradient(45deg, #228BE6 0%, #40C057 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Join Our Growing Community
            </Title>
            <Text
              size="xl"
              maw={600}
              mx="auto"
              mb={40}
              color="dimmed"
              style={{ lineHeight: 1.6 }}
            >
              Get access to exclusive features, early updates, and connect with other users. Best of all, it&apos;s completely free!
            </Text>
            <Group justify="center" gap="xl">
              <Link href="/register" passHref style={{ textDecoration: 'none' }}>
                <Button
                  size="xl"
                  variant="gradient"
                  gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
                  leftSection={<IconUserPlus size={20} />}
                >
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/login" passHref style={{ textDecoration: 'none' }}>
                <Button
                  size="xl"
                  variant="outline"
                  color="blue"
                  leftSection={<IconLogin size={20} />}
                >
                  Log In
                </Button>
              </Link>
            </Group>
            <Group mt={50} justify="center" gap={50}>
              <Box style={{ textAlign: 'center' }}>
                <Text size="xl" fw={700} style={{ color: theme.colors.blue[5] }}>10K+</Text>
                <Text size="sm" color="dimmed">Active Users</Text>
              </Box>
              <Box style={{ textAlign: 'center' }}>
                <Text size="xl" fw={700} style={{ color: theme.colors.blue[5] }}>50+</Text>
                <Text size="sm" color="dimmed">Tools Available</Text>
              </Box>
              <Box style={{ textAlign: 'center' }}>
                <Text size="xl" fw={700} style={{ color: theme.colors.blue[5] }}>24/7</Text>
                <Text size="sm" color="dimmed">Support</Text>
              </Box>
            </Group>
          </Box>
        </Flex>

        {/* Wave Divider */}
        <svg style={{ display: 'block', width: '100%', height: 'auto' }} viewBox="0 0 1440 320"><path fill={bgColor} fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>

        {/* Get in Touch Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            minHeight: '100vh',
            textAlign: 'center',
            backgroundColor: bgColor,
          }}
        >
          <Box
            style={{
              maxWidth: '800px',
              padding: '2rem',
              animation: 'fadeIn 1s ease-in'
            }}
          >
            <Title
              order={2}
              style={{
                fontWeight: 800,
                fontSize: '3rem',
                marginBottom: '2rem',
                background: 'linear-gradient(45deg, #228BE6 0%, #40C057 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Let&apos;s Connect
            </Title>
            <Text
              size="xl"
              maw={600}
              mx="auto"
              mb={40}
              color="dimmed"
              style={{ lineHeight: 1.6 }}
            >
              Have questions, suggestions, or just want to say hello? We&apos;d love to hear from you! Our support team is ready to assist you 24/7.
            </Text>
            <Group justify="center" gap="xl">
              <Link href="/coming-soon" passHref style={{ textDecoration: 'none' }}>
                <Button
                  size="xl"
                  variant="gradient"
                  gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
                  leftSection={<IconMessage size={20} />}
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/coming-soon" passHref style={{ textDecoration: 'none' }}>
                <Button
                  size="xl"
                  variant="outline"
                  color="blue"
                  leftSection={<IconHelp size={20} />}
                >
                  View FAQ
                </Button>
              </Link>
            </Group>
            <SimpleGrid
              cols={{ base: 1, sm: 3 }}
              spacing="xl"
              mt={50}
            >
              <Card p="lg" radius="md" withBorder>
                <IconMail size={30} style={{ marginBottom: '1rem', color: theme.colors.blue[5] }} />
                <Text fw={500} mb="xs">Email Us</Text>
                <Text size="sm" color="dimmed">support@freetool.dev</Text>
              </Card>
              <Card p="lg" radius="md" withBorder>
                <IconClock size={30} style={{ marginBottom: '1rem', color: theme.colors.blue[5] }} />
                <Text fw={500} mb="xs">24/7 Support</Text>
                <Text size="sm" color="dimmed">Always here to help</Text>
              </Card>
              <Card p="lg" radius="md" withBorder>
                <IconBrandTwitter size={30} style={{ marginBottom: '1rem', color: theme.colors.blue[5] }} />
                <Text fw={500} mb="xs">Follow Us</Text>
                <Text size="sm" color="dimmed">@freetool</Text>
              </Card>
            </SimpleGrid>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default HomePage;