import {
  Field,
  ObjectType,
  GraphQLISODateTime,
  ID, Float, registerEnumType,
} from '@nestjs/graphql';
import {
  Entity,
  OneToOne,
  OneToMany,
  ManyToOne,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

export enum PaymentStatusEnum {
  requested = 'requested', // 결제(수납) 요청
  paymentCompleted = 'paymentCompleted', // 결제(수납) 완료
  paymentFailed = 'paymentFailed', // 결제(수납) 실패
  refundCompleted = 'refundCompleted', // 환불 완료
  refundFailed = 'refundFailed' // 환불 실패
}

export enum PaymentMethodTypeEnum {
  kakaopay = 'kakaopay', // 카카오페이
  nicepay = 'nicepay', // 나이스페이
  bankTransfer = 'bankTransfer' // 계좌이체
}
export enum TreatmentStatusEnum {
  request = 'request', //진료 요청 중
  waiting = 'waiting', //진료 대기 중
  cancel = 'cancel', //진료 대기 취소
  matchingfail = 'matchingfail', //진료 매칭 실패
  ontreatment = 'ontreatment', //진료 중
  endcall = 'endcall', //통화 종료
  completion = 'completion', //진료 완료
  treatmenterror = 'treatmenterror', //진료 실패
  orderprescription = 'orderprescription', //처방 발행
}

registerEnumType(TreatmentStatusEnum, {
  name: 'TreatmentStatusEnum',
});

export enum ProductTypeEnum {
  //진료 요청 Prduct Type
  mobile = 'mobile',
  tv = 'tv',
  addOn = 'addOn',
}

registerEnumType(ProductTypeEnum, {
  name: 'ProductTypeEnum',
});

export enum PrescriptionStateEnum {
  none = 'none', // 처방전 없음
  required = 'required' // 처방전 발급 필수
}

registerEnumType(PrescriptionStateEnum, {
  name: 'PrescriptionStateEnum',
});

registerEnumType(PaymentStatusEnum, {
  name: 'PaymentStatusEnum',
});

registerEnumType(PaymentMethodTypeEnum, {
  name: 'PaymentMethodTypeEnum',
});

@Index(['doctorId', 'status', 'createdAt'])
@ObjectType({isAbstract: true})
@Entity({name: 'treatments'})
export class Treatment {
  @Field(() => TreatmentStatusEnum)
  @Column('varchar')
  status: TreatmentStatusEnum;

  @Index('indexOfCreatedAt')
  @Field(() => GraphQLISODateTime, {description: '생성일'})
  @CreateDateColumn()
  declare createdAt: Date;

  @Index()
  @Field(() => GraphQLISODateTime)
  @Column('datetime', {default: () => 'CURRENT_TIMESTAMP'})
  matchingStartedAt: Date;

  @Field(() => GraphQLISODateTime, {nullable: true})
  @Column('datetime', {nullable: true})
  matchingEndedAt?: Date;

  @Field(() => GraphQLISODateTime, {nullable: true})
  @Column('datetime', {nullable: true})
  treatmentWaitingTime?: Date;

  @Field(() => GraphQLISODateTime, {nullable: true})
  @Column('datetime', {nullable: true})
  treatmentStartedAt?: Date;

  @Field(() => GraphQLISODateTime, {nullable: true})
  @Column('datetime', {nullable: true})
  treatmentEndedAt?: Date;

  @Field(() => String, {nullable: true})
  @Column('text', {nullable: true})
  symptomDescription: string;

  @Field(() => [String], {nullable: true})
  @Column('simple-array', {nullable: true})
  symptomImageS3Keys?: string[];

  @Field(() => [String], {nullable: true})
  symptomImageUrls?: string[];

  @Index('indexOfUserId')
  @Field(() => ID)
  @Column('bigint', {unsigned: true})
  userId: string;

  @Field(() => String, {nullable: true})
  @Column('bigint', {unsigned: true, nullable: true})
  clientMethodId?: string;

  @Field(() => String, {nullable: true})
  cardName?: string;

  @Field(() => String, {nullable: true})
  lastCardNumber?: string;

  @Field(() => String, {nullable: true})
  @Column('text', {nullable: true})
  treatmentNote: string;

  @Field(() => ID)
  @Column('bigint', {unsigned: true})
  departmentId: string;

  @Index('indexOfPatientId')
  @Field(() => ID)
  @Column('bigint', {unsigned: true})
  patientId: string;

  @Field(() => ID, {nullable: true})
  @Column('bigint', {nullable: true, unsigned: true})
  doctorId?: string;

  @Field(() => String, {nullable: true})
  @Column('varchar', {length: 100, nullable: true})
  opentokSessionId?: string;

  @Field(() => Boolean)
  @Column('boolean', {default: false, comment: '콜백으로 요청'})
  callbackRequest: boolean;
  
  @Field(() => GraphQLISODateTime, {nullable: true})
  @Column( {nullable: true})
  reservedAt?: Date;
  
  @Field(() => Boolean, {nullable: true, description: '의사지정 진료 여부'})
  @Column( 'boolean', {default: false, comment: '의사지정 진료 여부'})
  isDirect: boolean;

  @Column('varchar', {length: 100, nullable: true})
  opentokArchiveId?: string;

  @Field(() => String, {nullable: true})
  @Column('varchar', {
    nullable: true,
    comment: '휴대폰번호',
    length: 255,
  })
  phone?: string;

  @Field(() => Float, {nullable: true})
  @Column('decimal', {comment: '위도', precision: 20, scale: 15})
  latitude?: number;

  @Field(() => Float, {nullable: true})
  @Column('decimal', {comment: '경도', precision: 20, scale: 15})
  longitude?: number;
  
  @Field(() => Number, {nullable: true, description: '진료비'})
  @Column('int', {nullable: true, comment: '진료비'})
  fee?: number;
  
  @Field(() => Boolean, {nullable: true, description: '진료비 납부 여부'})
  @Column('boolean', {default: false, comment: '진료비 납부 여부'})
  isPaid: boolean;
  
  /**
   * @deprecated
   * 제거 버전 Mobile Sprint 34 배포
   */
  @Field(() => Boolean, {nullable: true, description: '후불결제 여부'})
  @Column('boolean', {default: false, comment: '후불결제 여부'})
  isPostPayment: boolean;

  @Field(() => ProductTypeEnum)
  @Column('varchar', {length: 20, default: ProductTypeEnum.mobile})
  productType: ProductTypeEnum

  @Field(() => ID, {nullable: true, description: '결제 취소용 ID'})
  @Column('bigint', {nullable: true, comment: '결제 취소용 ID'})
  paymentId?: string;
  
  @Field(() => PrescriptionStateEnum, {nullable: true, description: '처방전이 발급되는 진료인지 여부'})
  @Column('varchar', {length: 32, comment: '처방전이 발급되는 진료인지 여부'})
  prescriptionState?: PrescriptionStateEnum;
  
  @Field(() => PaymentMethodTypeEnum, {nullable: true,  description: '결제 수단 종류'})
  @Column('varchar', {length: 32, nullable: true, comment: '결제 수단 종류'})
  paymentMethodType?: PaymentMethodTypeEnum;
  
  @Field(() => PaymentStatusEnum, {nullable: true,  description: '결제(수납) 상태'})
  @Column('varchar', {length: 32, nullable: true,  comment: '결제(수납) 상태'})
  paymentStatus?: PaymentStatusEnum;
}
