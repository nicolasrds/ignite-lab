
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

import code_background from '../../public/assets/code_background.png'
import { useCreateSubscriberMutation } from "../graphql/generated";
import { GithubLogo } from "phosphor-react";


export function Subscriber() {

    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const [createSubscriber, { loading }] = useCreateSubscriberMutation();

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();


        await createSubscriber({
            variables: {
                name,
                email,
            }
        })

        navigate('/event/lesson/aula-1')

    }




    useEffect(() => {

        const [, codeGithub] = window.location.href.split('code=');

        if (!codeGithub) {
            return;
        }

        navigate('/event/lesson/aula-1');

    })


    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex flex-col lg:flex-row  items-center justify-between  mt-20">
                <div className="max-w-[640px] text-justify">
                    <div className="p-8 lg:p-0">
                        <Logo />
                    </div>
                    <div className="hidden lg:block">
                        <h1 className="mt-8 lg:text=[2.5rem]">
                            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed">
                            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para ac essar as melhores oportunidades do mercado.
                        </p>
                    </div>
                </div>
                <div className="mt-5 p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="lg:text-2xl mb-6 block">Inscreva-se Gratuitamente</strong>

                    <form className="flex flex-col gap-2 w-full">
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text"
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)} />

                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="email"
                            placeholder="Digite seu e-mail"
                            onChange={event => setEmail(event.target.value)} />

                        <button
                            disabled={loading}
                            onClick={handleSubscribe}
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Garantir minha vaga
                        </button>

                        <a
                            href="https://github.com/login/oauth/authorize?scope=user&client_id=cab76575908ef0fb68f6"
                            className=" flex justify-center mt-4 text-center bg-gray-500 uppercase p-4 rounded font-bold text-sm hover:bg-gray-600 transition-colors">
                            <span>Garantir com Github</span>
                            <GithubLogo size={20} />
                        </a>

                    </form>


                </div>
            </div>
            <img src={code_background} alt="Code Background" className="mt-5" />

        </div>
    )
}