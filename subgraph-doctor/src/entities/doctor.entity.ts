import {Field, GraphQLISODateTime, ID, Int, ObjectType, registerEnumType} from '@nestjs/graphql';
import {Column, Entity, ManyToOne, OneToMany, JoinColumn, Index, DeleteDateColumn, OneToOne} from 'typeorm';

export enum DoctorGenderEnum {
  unknown = 'unknown',
  male = 'male',
  female = 'female',
}

registerEnumType(DoctorGenderEnum, {
  name: 'DoctorGenderEnum',
});

export enum MedicalTypeEnum {
  medicine = 'medicine', // 일반
  dentalMedicine = 'dentalMedicine', // 치과
  koreanMedicine = 'koreanMedicine' // 한의학
}

registerEnumType(MedicalTypeEnum, {
  name: 'MedicalTypeEnum',
});

/**
 * 의료진 테이블
 * 활용 엔드포인트 : 검색
 */

@ObjectType({isAbstract: true})
@Entity({name: 'doctors'})
export class Doctor  {
  @Field(() => String)
  @Column('varchar', {length: 50})
  name: string;

  @Field(() => DoctorGenderEnum)
  @Column('varchar', {
    default: DoctorGenderEnum.unknown,
    comment: 'unknown, male, female',
  })
  gender: DoctorGenderEnum;

  @Field(() => String, {nullable: true})
  @Column('varchar', {
    length: 50,
    nullable: true,
    comment: '대표원장, 원장 부원장..',
  })
  position?: string;

  @Field(() => String, {nullable: true})
  @Column('varchar', {length: 255, nullable: true})
  image?: string;

  @Field(() => String, {nullable: true, description: '의료진 한줄 소개'})
  @Column('varchar', {length: 255, nullable: true, comment: '의료진 한줄 소개'})
  introductionSummary?: string;

  @Field(() => String, {nullable: true, description: '의료진 상세 소개'})
  @Column('text', {nullable: true, comment: '의료진 상세 소개'})
  introductionDetail?: string;

  @Field(() => String, {
    nullable: true,
    description: '학력 및 경력 및 수상이력',
  })
  @Column('text', {nullable: true, comment: '학력 및 경력 및 수상이력'})
  profile?: string;

  @Field(() => Int)
  @Column('int', {default: 100, unsigned: true})
  sort: number;

  @Field(() => Boolean)
  @Column('boolean', {default: true})
  visibility?: boolean;

  // 헬스조선의 경우 명의 라는 체크를 추가함
  @Field(() => String, {nullable: true})
  @Column('varchar', {
    length: 50,
    nullable: true,
    comment: '데이터 출처 - 직접작성(null), 헬스조선(healthCs)..',
  })
  sourceType?: string;

  @Field(() => ID)
  @Column('bigint', {unsigned: true})
  hospitalId: string;


  @Field(() => String, {nullable: true})
  @Column('varchar', {
    length: 255,
  })
  phone?: string;

  @Field(() => Boolean)
  @Column('boolean', {default: true, comment: '비대면 노출 여부'})
  untactVisibility: boolean;

  @Field(() => Boolean)
  @Column('boolean', {default: false, comment: '클리닉 노출 여부'})
  clinicVisibility: boolean;

  @Field(() => Boolean)
  @Column('boolean', {default: false, comment: 'TV 노출 여부'})
  tvVisibility: boolean;

  @Field(() => String, {nullable: true})
  @Column('varchar', {nullable: true, comment: '비대면 스마트TV 이미지 url'})
  tvImageUrl?: string;

  @Field(() => Boolean)
  @Column('boolean', {default: true, comment: '비대면 진료가능 상태 플래그'})
  untactOnTreatment: boolean;

  @Field(() => String, {nullable: true, description: '비대면 공지사항'})
  @Column('text', {nullable: true, comment: '비대면 공지사항'})
  untactNotice?: string;

  @Field(() => Boolean, {nullable: true, description: '어워드 뱃지 표시 여부'})
  @Column('boolean', {nullable: true, default: false, comment: '어워드 뱃지 표시 여부'})
  showAwardBadge?: boolean;
  
  @Field(() => MedicalTypeEnum, {description: '기본, 치과, 한의학 구분'})
  @Column('varchar', {
    length: 32,
    default: MedicalTypeEnum.medicine,
    comment: '기본, 치과, 한의학 구분',
  })
  type: MedicalTypeEnum;


  @Field(() => GraphQLISODateTime, {description: '삭제일'})
  @DeleteDateColumn()
  deletedAt: Date;

}
