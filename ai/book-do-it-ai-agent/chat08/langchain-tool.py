{
    "cells": [
        {
            "cell_type": "code",
            "execution_count": 1,
            "metadata": {},
            "outputs": [
                {
                    "data": {
                        "text/plain": [
                            "AIMessage(content='네, 감사합니다! 당신은 어떻게 지내고 계신가요?', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 16, 'prompt_tokens': 12, 'total_tokens': 28, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_13eed4fce1', 'finish_reason': 'stop', 'logprobs': None}, id='run-9a7f657b-226b-42a2-9d4c-25d57a385bec-0', usage_metadata={'input_tokens': 12, 'output_tokens': 16, 'total_tokens': 28, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})"
                        ]
                    },
                    "execution_count": 1,
                    "metadata": {},
                    "output_type": "execute_result",
                }
            ],
            "source": [
                "from langchain_openai import ChatOpenAI\n",
                "from langchain_core.messages import HumanMessage\n",
                'llm = ChatOpenAI(model="gpt-4o-mini")\n',
                "\n",
                'llm.invoke([HumanMessage("잘 지냈어?")])',
            ],
        },
        {
            "cell_type": "code",
            "execution_count": 2,
            "metadata": {},
            "outputs": [],
            "source": [
                "from langchain_core.tools import tool\n",
                "from datetime import datetime\n",
                "import pytz\n",
                "\n",
                "@tool # @tool 데코레이터를 사용하여 함수를 도구로 등록\n",
                "def get_current_time(timezone: str, location: str) -> str:\n",
                '    """ 현재 시각을 반환하는 함수\n',
                "\n",
                "    Args:\n",
                "        timezone (str): 타임존 (예: 'Asia/Seoul') 실제 존재하는 타임존이어야 함\n",
                "        location (str): 지역명. 타임존이 모든 지명에 대응되지 않기 때문에 이후 llm 답변 생성에 사용됨\n",
                '    """\n',
                "    tz = pytz.timezone(timezone)\n",
                '    now = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")\n',
                "    location_and_local_time = f'{timezone} ({location}) 현재시각 {now} ' # 타임존, 지역명, 현재시각을 문자열로 반환\n",
                "    print(location_and_local_time)\n",
                "    return location_and_local_time\n",
            ],
        },
        {
            "cell_type": "code",
            "execution_count": 3,
            "metadata": {},
            "outputs": [],
            "source": [
                "# 도구를 tools 리스트에 추가하고, tool_dict에도 추가\n",
                "tools = [get_current_time,]\n",
                'tool_dict = {"get_current_time": get_current_time,}\n',
                "\n",
                "# 도구를 모델에 바인딩: 모델에 도구를 바인딩하면, 도구를 사용하여 llm 답변을 생성할 수 있음\n",
                "llm_with_tools = llm.bind_tools(tools)",
            ],
        },
        {
            "cell_type": "code",
            "execution_count": 4,
            "metadata": {},
            "outputs": [
                {
                    "name": "stdout",
                    "output_type": "stream",
                    "text": [
                        "[SystemMessage(content='너는 사용자의 질문에 답변을 하기 위해 tools를 사용할 수 있다.', additional_kwargs={}, response_metadata={}), HumanMessage(content='부산은 지금 몇시야?', additional_kwargs={}, response_metadata={}), AIMessage(content='', additional_kwargs={'tool_calls': [{'id': 'call_xC0QhLkdBKHhihHG4zHFRiBX', 'function': {'arguments': '{\"timezone\":\"Asia/Seoul\",\"location\":\"Busan\"}', 'name': 'get_current_time'}, 'type': 'function'}], 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 24, 'prompt_tokens': 135, 'total_tokens': 159, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_00428b782a', 'finish_reason': 'tool_calls', 'logprobs': None}, id='run-eed19018-9933-4516-9241-f6c5a32a6366-0', tool_calls=[{'name': 'get_current_time', 'args': {'timezone': 'Asia/Seoul', 'location': 'Busan'}, 'id': 'call_xC0QhLkdBKHhihHG4zHFRiBX', 'type': 'tool_call'}], usage_metadata={'input_tokens': 135, 'output_tokens': 24, 'total_tokens': 159, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]\n"
                    ],
                }
            ],
            "source": [
                "from langchain_core.messages import SystemMessage\n",
                "\n",
                "# (4) 사용자의 질문과 tools 사용하여 llm 답변 생성\n",
                "messages = [\n",
                '    SystemMessage("너는 사용자의 질문에 답변을 하기 위해 tools를 사용할 수 있다."),\n',
                '    HumanMessage("부산은 지금 몇시야?"),\n',
                "]\n",
                "\n",
                "# (5) llm_with_tools를 사용하여 사용자의 질문에 대한 llm 답변 생성\n",
                "response = llm_with_tools.invoke(messages)\n",
                "messages.append(response)\n",
                "\n",
                "# (6) 생성된 llm 답변 출력\n",
                "print(messages)",
            ],
        },
        {
            "cell_type": "code",
            "execution_count": 5,
            "metadata": {},
            "outputs": [
                {
                    "name": "stdout",
                    "output_type": "stream",
                    "text": [
                        "{'timezone': 'Asia/Seoul', 'location': 'Busan'}\n",
                        "Asia/Seoul (Busan) 현재시각 2025-02-18 00:38:38 \n",
                    ],
                },
                {
                    "data": {
                        "text/plain": [
                            "[SystemMessage(content='너는 사용자의 질문에 답변을 하기 위해 tools를 사용할 수 있다.', additional_kwargs={}, response_metadata={}),\n",
                            " HumanMessage(content='부산은 지금 몇시야?', additional_kwargs={}, response_metadata={}),\n",
                            " AIMessage(content='', additional_kwargs={'tool_calls': [{'id': 'call_xC0QhLkdBKHhihHG4zHFRiBX', 'function': {'arguments': '{\"timezone\":\"Asia/Seoul\",\"location\":\"Busan\"}', 'name': 'get_current_time'}, 'type': 'function'}], 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 24, 'prompt_tokens': 135, 'total_tokens': 159, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_00428b782a', 'finish_reason': 'tool_calls', 'logprobs': None}, id='run-eed19018-9933-4516-9241-f6c5a32a6366-0', tool_calls=[{'name': 'get_current_time', 'args': {'timezone': 'Asia/Seoul', 'location': 'Busan'}, 'id': 'call_xC0QhLkdBKHhihHG4zHFRiBX', 'type': 'tool_call'}], usage_metadata={'input_tokens': 135, 'output_tokens': 24, 'total_tokens': 159, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}),\n",
                            " ToolMessage(content='Asia/Seoul (Busan) 현재시각 2025-02-18 00:38:38 ', name='get_current_time', tool_call_id='call_xC0QhLkdBKHhihHG4zHFRiBX')]",
                        ]
                    },
                    "execution_count": 5,
                    "metadata": {},
                    "output_type": "execute_result",
                },
            ],
            "source": [
                "for tool_call in response.tool_calls:\n",
                '    selected_tool = tool_dict[tool_call["name"]] # (7) tool_dict를 사용하여 도구 함수를 선택\n',
                '    print(tool_call["args"]) # (8) 도구 호출 시 전달된 인자 출력\n',
                "    tool_msg = selected_tool.invoke(tool_call) # (9) 도구 함수를 호출하여 결과를 반환\n",
                "    messages.append(tool_msg)\n",
                "\n",
                "messages",
            ],
        },
        {
            "cell_type": "code",
            "execution_count": 6,
            "metadata": {},
            "outputs": [
                {
                    "data": {
                        "text/plain": [
                            "AIMessage(content='현재 부산은 2025년 2월 18일 00시 38분 38초입니다.', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 26, 'prompt_tokens': 192, 'total_tokens': 218, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_00428b782a', 'finish_reason': 'stop', 'logprobs': None}, id='run-c66dd490-141a-4aea-8749-02a3fcbbebcb-0', usage_metadata={'input_tokens': 192, 'output_tokens': 26, 'total_tokens': 218, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})"
                        ]
                    },
                    "execution_count": 6,
                    "metadata": {},
                    "output_type": "execute_result",
                }
            ],
            "source": ["llm_with_tools.invoke(messages)"],
        },
        {
            "cell_type": "code",
            "execution_count": null,
            "metadata": {},
            "outputs": [],
            "source": [],
        },
    ],
    "metadata": {
        "kernelspec": {"display_name": "venv", "language": "python", "name": "python3"},
        "language_info": {
            "codemirror_mode": {"name": "ipython", "version": 3},
            "file_extension": ".py",
            "mimetype": "text/x-python",
            "name": "python",
            "nbconvert_exporter": "python",
            "pygments_lexer": "ipython3",
            "version": "3.12.9",
        },
    },
    "nbformat": 4,
    "nbformat_minor": 2,
}
