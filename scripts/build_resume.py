"""Build a plain one-page text resume with reportlab. Requires reportlab and pypdf.

The portfolio serves the designed Product Manager resume at
public/Aditi_Navhal_Resume.pdf. This script writes somewhere else on purpose,
so a run can never replace that file. Pass an output path to override.
"""
import sys
from pathlib import Path
from xml.sax.saxutils import escape
from pypdf import PdfReader
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
path=Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent / 'Aditi_Navhal_Resume_plain.pdf'
experience = ' , WFYI Technology – FylFlix Jan 2026 – Aug 2026\nDelhi NCR, India\n• Owned product and full stack engineering across four surfaces of a multi-vertical SaaS platform (legal, tax, finance, admin):\ndefined customer journeys for four user segments, authored PRDs and BRDs , and led a 5 to 7 person cross-functional team .\nReached 500+ ITR sign-ups in one filing season and 12 business clients .\n• Built an internal low-code, configuration-driven template replacing per-page development, launching 180+ service pages and\nletting non-engineers add new ones without further engineering work , then turned it into a reusable accelerator for the team.\n• Built the Tally Connector, an integration pulling a legacy on-premise accounting system (26 TallyPrime entities) into cloud\nstorage and PostgreSQL data workflows with delta sync and idempotent writes, reaching 20 installs in its first week .\n• Shipped GenAI / LLM-powered product features (prompt design, model API integration, fallback handling) and built 100+\nREST API integrations behind monetization workflows, in React.js, Next.js and TypeScript.\nSoftware Engineer, Indus V alley Partners (IVP) (Promoted from Associate Software Engineer) Jul 2023 – Dec 2025\nMumbai, Maharashtra\n• Client-facing with Aurelius Capital Management on enterprise reconciliation workflows, translating business\nrequirements and operational issues into product improvements, with delivery for PwC and Carronade Capital.\n• Led a 3 to 4 person team migrating an enterprise legacy system from .NET Framework to .NET Core , delivering 10+\nproduction features, a 30% performance gain and 25% faster release cycles.\n• Built data pipelines and reporting: automated 100+ financial and compliance reports with SSRS and SSIS ETL, cutting a\nkey workflow from approximately 6 hours to 2 hours .'
skills = 'Full Stack Development: React.js, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS; C#, .NET Core, REST\nAPI Design, Microservices, OOP , Design Patterns\nIntegrations & Data: API Integrations, Enterprise & Legacy System Integration, On-Premise to Cloud Connectors, Data\nPipelines, ETL (SSIS), Delta Sync & Idempotency, SQL Server, PostgreSQL, MySQL, SQLite, JSON, XML\nGenAI: LLM API Integration, Prompt Engineering, Model Fallback Handling, AI-Assisted Development (GitHub Copilot, Claude)\nSolution Delivery: Client-Facing Solutioning, Business Process Mapping, Requirements Gathering, Legacy System Assessment,\nRapid Prototyping, Low-Code & Configuration-Driven Tooling, Accelerators & Templates, Production-Grade Delivery\nProduct: Discovery, Customer Journey Design, PRDs & BRDs, MVP Definition, Roadmapping, Prioritization, User\nSegmentation, Stakeholder Management\nAnalytics: SQL, Funnel Analysis, Event Tracking & Instrumentation, Product Metrics, Unit Economics, Market Sizing\nDelivery: Agile/Scrum, Git & GitHub, CI/CD Pipelines, Docker, AWS, Enterprise SaaS, Cross-Functional Team Leadership'
education = 'Mukesh Patel School of Technology Management & Engineering (NMIMS) 2019 – 2023\nB.Tech in Information Technology – CGPA: 3.99/4.00 | Ranked #1 in Program\nLeadership: Led the Atrangi Art Committee, Ambiora Tech Fest and the cultural fest, NMIMS; State-level Badminton Player.'
styles={
 'name':ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=19,leading=22,textColor=HexColor('#16465c'),spaceAfter=3),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=8.5,leading=10.6,spaceAfter=3),
 'heading':ParagraphStyle('heading',fontName='Helvetica-Bold',fontSize=10.5,leading=13,textColor=HexColor('#16465c'),spaceBefore=6,spaceAfter=4),
 'role':ParagraphStyle('role',fontName='Helvetica-Bold',fontSize=8.7,leading=11,spaceBefore=3,spaceAfter=3),
 'bullet':ParagraphStyle('bullet',fontName='Helvetica',fontSize=8.5,leading=10.6,leftIndent=9,firstLineIndent=-7,spaceAfter=3),
}
story=[]
def add(text,style='body'):
 story.append(Paragraph(escape(text), styles[style]))
def paragraphs(raw):
 groups=[]
 for line in raw.splitlines():
  line=line.strip().replace('Indus V alley','Indus Valley')
  if not line: continue
  is_start=line.startswith(('•','Software Engineer','Full Stack Development:','Integrations & Data:','GenAI:','Solution Delivery:','Product:','Analytics:','Delivery:','B.Tech','Leadership:','Mukesh Patel','Mumbai,','Delhi NCR,'))
  if is_start or not groups: groups.append(line)
  else: groups[-1]+=' '+line
 for part in groups:
  part = part.replace('Owned product and full stack engineering across four surfaces of a multi-vertical SaaS platform (legal, tax, finance, admin): defined customer journeys for four user segments, authored PRDs and BRDs , and led a 5 to 7 person cross-functional team . Reached 500+ ITR sign-ups in one filing season and 12 business clients .', 'Combined product ownership and full-stack delivery across four FylFlix surfaces: defined journeys for four user segments, authored PRDs and BRDs, and led a team of up to 10 across engineering, QA, marketing and social. The platform reached 500+ ITR sign-ups and 380+ paid filings in one filing season, with 12 business and 7+ legal clients.')
  part = part.replace('Shipped GenAI / LLM-powered product features (prompt design, model API integration, fallback handling) and built 100+ REST API integrations behind monetization workflows, in React.js, Next.js and TypeScript.', 'Scoped a staff admin MVP for four roles with the founders and deferred 13 lower-priority features with explicit revisit criteria. Built shared React/Next.js interfaces, authentication, organization permissions and Razorpay payment flows.')
  part = part.replace('Client-facing with Aurelius Capital Management on enterprise reconciliation workflows, translating business requirements and operational issues into product improvements, with delivery for PwC and Carronade Capital.', 'Worked with Aurelius Capital Management to translate reconciliation workflows and operational issues into requirements and product improvements; also delivered reporting solutions for PwC and Carronade Capital.')
  add(part,'bullet' if part.startswith('•') else 'role' if part.startswith('Software Engineer') else 'body')
add('Aditi Navhal','name')
add('Software Engineer with Product Ownership | React / Next.js | C# / .NET | SQL')
add('Delhi NCR, India | aditinavhal01@gmail.com | +91-8769589069')
story.append(Paragraph('<link href="https://www.linkedin.com/in/aditinavhal/">LinkedIn</link> | <link href="https://aditin22.github.io/aditi-portfolio/">Portfolio</link>',styles['body']))
add('Summary','heading')
add('Three years across fintech and legaltech, combining software engineering with product ownership at FylFlix. Defined customer journeys, PRDs and BRDs, scoped MVPs and coordinated cross-functional delivery while building React/Next.js applications, payments and authentication. At IVP, translated enterprise client workflows into requirements and delivered .NET, React and SQL improvements. Seeking product management or full-stack development roles.')
add('Professional Experience','heading')
paragraphs('Software Engineer (Product Ownership)'+experience)
add('Projects','heading')
add('UrjaSetu BioEnergy | 0-to-1 B2B Platform (client project) | Sep 2026 - Present','role')
add('• Ran 15 to 20 days of discovery with industrial buyers and boiler operators; wrote the PRDs and BRDs.','bullet')
add('• Shipped with a 2-person team: a Fuel Finder and fuel calculator that qualify leads, plus an ops dashboard.','bullet')
add('• Defined KPIs such as quote requests per week and set up KPI tracking across 15+ analytics events.','bullet')
add('• Built market-sizing and unit-economics models; planned go-to-market on IndiaMART and Google.','bullet')
add('Skills','heading')
add('Product Management: Customer journeys, PRDs & BRDs, MVP definition, roadmapping, prioritization, user segmentation, stakeholder management and cross-functional delivery.')
add('Full-Stack Development: React, Next.js, TypeScript, JavaScript, HTML/CSS, Tailwind CSS; C#, .NET Core, REST APIs, reusable components and application architecture.')
add('Data & Analytics: SQL Server, PostgreSQL, SQLite, SSRS, SSIS/ETL and reporting automation; KPI tracking, funnel analysis, A/B testing, user retention, unit economics and market sizing.')
add('Reliability & Delivery: OAuth 2.0, JWT, RBAC, payment verification, idempotency, delta sync, xUnit, Git, CI/CD, AWS and Agile/Scrum.')
add('Education','heading');paragraphs(education)
SimpleDocTemplate(str(path),pagesize=(595.28,841.89),rightMargin=30,leftMargin=30,topMargin=23,bottomMargin=23,title='Aditi Navhal Resume',author='Aditi Navhal').build(story)
r=PdfReader(path)
print('Pages:',len(r.pages))
assert len(r.pages)==1,'Resume should remain one page'
t='\n'.join(p.extract_text() for p in r.pages)
assert 'client project' in t and 'Self-directed' not in t, 'UrjaSetu must read as a client project'

from pypdf import PdfWriter
writer=PdfWriter(clone_from=str(path))
writer.compress_identical_objects(remove_duplicates=True,remove_unreferenced=True)
writer.write(str(path))
