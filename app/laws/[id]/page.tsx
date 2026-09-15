import {notFound} from 'next/navigation';
import {LawDetail} from '../../law-detail-ui';
import {laws} from '../../data';
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const law=laws.find(l=>String(l.id)===id);return {title:law?law.title:'Law not found'}}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const law=laws.find(l=>String(l.id)===id);if(!law)notFound();return <LawDetail law={law}/>}
