import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import apiInstance from "../../../services/api.instance";
import httpClientService from "../../../services/http-client.service";
import {log} from "util";


export default NextAuth({
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "johndoe@test.com",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
               const {email, password} = credentials as {
                   email: string,
                   password: string
               }
                try {
                    const {data} = await httpClientService.post('auth/login', {
                        'email': email,
                        'password': password
                    })
                    return data
                } catch (e: any) {
                    throw new Error( JSON.stringify({ errors: e.response.data.errors, status: false }))
                }

            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        // @ts-ignore
        async session({session, token}) {
            return token
        }
    },
    pages: {
        signIn: '/login'
    }
});