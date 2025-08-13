from crewai import Agent, Task, Crew, Process
from dotenv import load_dotenv

load_dotenv()

joke_researcher = Agent(
    role="Joke Researcher",
    goal="{topic}에 관해 웃음을 유발하는 요소들을 연구한다.",
    verbose=True,
    memory=True,
    backstory=(
        "슬랩스틱 유머에 열정을 가진 당신은 숙력된 유머 연구원입니다. "
        "일상적인 상황에서 웃음을 유발하는 요수를 찾아내는 데 능숙하며, "
        "지루한 순간도 폭소로 바꿀 수 있는 능력을 갖추고 있습니다."
    ),
    allow_delegation=True,
)

joke_writer = Agent(
    role="Joke Writer",
    goal="{topic}에 관한 우스꽝스럽고 재미있는 농담을 작성한다.",
    verbose=True,
    memory=True,
    backstory=(
        "당신은 유머 감각이 뛰어난 농담 작가입니다. 간단한 아이디어도 "
        "폭소를 유발하는 농담으로 바꿀 수 있으며, 몇 줄의 문장만으로도 "
        "사람들을 웃게 만드는 재능을 가지고 있습니다."
    ),
    allow_delegation=True,
)

research_task = Task(
    description=(
        "다음 주제가 왜 재미있는지 파악한다: {topic}. "
        "유머러스한 핵심 요소들을 반드시 포함해야 한다. "
        "또한, 현재 사회적 트렌트에 대한 분석과 "
        "이것이 유머 인식에 미치는 영향도 제공해야 한다."
    ),
    expected_output=(
        "최신 유머에 관한 포괄적인 3문단 분량의 보고서"
    ),
    agent=joke_researcher,
)

write_task = Task(
    description=(
        "{topic}에 관한 통찰력 있고 유머러스하며 사회의식을 "
        "포함한 농담을 작성한다. "
        "이 주제를 재미있게 만드는 핵심 요소와 현재 사회적 "
        "트렌트에 대한 분석을 포함해야 한다."
    ),
    expected_output=(
        "주제에 대한 유머러스한 농담"
    ),
    agent=joke_writer,
    async_execution=True,
    output_file="the_best_joke.md"
)

crew = Crew(
    agents=[joke_researcher, joke_writer],
    tasks=[research_task, write_task],
    process=Process.sequential,
    memory=True,
    verbose=True,
    cache=True,
    max_rpm=100,
    share_crew=True
)

result = crew.kickoff(
    inputs={"topic": "AI 엔지니어 농담"}
)
print(result)