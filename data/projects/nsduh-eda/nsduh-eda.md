nsduh-eda
# National Survey on Drug Use and Health (NSDUH) Exploratory Data Analysis

<!-- description -->
An Exploratory Data Analysis on national mental health and substance use data looking at differences in culture and groups. 

## 1. Napkin Blueprints

Mental Health Data: there's the idea that different cultures have different mental health stigmas. (I'm asian, I can attest to at least the feeling)

What's the gap between needing help vs. actually receiving it across different races/incomes/genders/age brackets?

Disparities in marginalized communities:
- What is the sample size for different respondent groups in that year's dataset?
- If sample sizes allow, what do the numbers say about the unique mental health hurdles sexual and gender minority groups face compared to general population baselines? 
- Are queer people able to access affirming mental health support at the same rate, or are there massive barriers in treatment? What about different cultures? Genders (mostly looking at men)? 
- Stigma check: how much does community support vs. isolation impact these metrics?

Age & Substance use:
- Are younger people more proactive about getting therapy? Are older? Is there an age group that is at all? 
- Generational differences in substance use vs. abuse patterns?
- Correlations between socio-economic stressors and coping mechanisms?

Will probably make different groupings based on multiple demographic aspects. 

idk this is a fun dataset

## 2. Ancient Scrolls

### What does the data look like? 

#### General Overview of data

*Center for Behavioral Health Statistics and Quality. (2025). 2024 National Survey on Drug Use and Health: Public use file data users’ guide. https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health*

*Note: The data is not stored anywhere in this git repository since it is too large. If you would like access to the data, go to the site above. The dataset is public access and I am using the 2025 tab delimited data.*

All of the Data by SAMHSA is open source. If you go to the github folder and open the path 'about the data (by SAMHSA)' or the website above, it will have the codebook, user manual, and the questionaires that respondents filled out. 

I am using the 2024 dataset which is the most recent publicly available dataset. The data is collected through in-person interviews in people's homes and web-based interviews of people 12 years and older. A limitation of this dataset is that it doesn't include people experiencing homelessness who are not in shelters, active military personnel, and residents of jails, nursing homes, mental institutions, and long-term care hospitals. 

The data has been deidentified before being made publicly to protect the confidentiality of the respondents. 

SAMHSA has annual reports, the most recent one published is a 2025 report with infographics, detailed tables, etc. 

Another possible limitation I'm seeing while looking through the codebook is that many of the subjective range based questions (Such as questions asking about the level of difficulty in performing a task such as seeing, hearing, remember, etc.) only have 3 possible answers: no difficulty, some difficulty, and a lot of difficulty or cannot do at all. This is very subjective data and has a very small range of allowance and does not separate lot of difficulty to cannot do at all. 

I also do wonder if there was any level of fatigue by the end of this questionaire (probably was) and how that might have affected the responses.

I also wonder if there was any extent of bias in responses based on discomfort. The information the respondents are giving are incredibly personal details, even though its on paper and is not going to be linked to that person at all in the end. There is the chance that people who are against seeing mental health guidance or either give incorrect responses or simply don't participate. 

Another possible limitation is that the data was collected all at once, which means that there could be bias about past experiences or general forgetfulness over the past. 

This survey also doesn't in any way determine causation versus correlation so determining root causes would be difficult with this data. 

<br>

#### Questionairre Resources

*SAMHSA Center for Behavioral Health Statistics and Quality (no date) 2025 National Survey on Drug Use and Health (NSDUH):Methodological Summary and Definitions, 2025 National Survey on Drug Use and Health (NSDUH): Methodological Summary and Definitions. Available at: https://www.samhsa.gov/data/sites/default/files/reports/rpt57377/2025-nsduh-method-summary-defs/2025-nsduh-method-summary-defs.htm#2-2 (Accessed: 24 September 2026).*

To measure mental health and substance abuse, they use official criteria to build the questions. 

Substance Use Disorder for Drugs and Alcohol: 
"SUD estimates for drugs and alcohol in the 2025 NSDUH were based on the criteria in the Diagnostic and Statistical Manual of Mental Disorders, 5th edition (DSM‑5; American Psychiatric Association, 2013). Respondents were asked SUD questions separately for any drugs or alcohol they used in the 12 months prior to the survey."

Clinical Measurement of Mental Illness in the MICS:
"Mental illness was measured in the MICS clinical interviews using an adapted version of the Structured Clinical Interview for the DSM‑5, Research Version, Non‐patient Edition (SCID‑5‑RV; First et al., 2015) and was differentiated by the level of functional impairment based on the Global Assessment of Functioning (GAF) scale (Endicott et al., 1976).62 Clinical interviewers assessed respondents for specific past year mental health disorders using the SCID."

Psychological Distress (K6):
"All adult respondents aged 18 or older who completed the NSDUH interview were asked to report their level of psychological distress using the K6."

Functional Impairment Due to Psychological Distress (WHODAS):
"All adult NSDUH respondents with a K6 score of 1 or higher63 were routed to an adapted version of the WHODAS to measure their level of functional impairment. The WHODAS was modified for use in a general population survey such as NSDUH by making minor changes to question wording and reducing its length (Novak, 2007). A subset of eight items was found to capture the information represented in the full 16‑item scale with no significant loss of information (Novak et al., 2010)."

Symptoms of Generalized Anxiety Disorder:
"Since 2024, the seven‐item generalized anxiety disorder (GAD‑7) screener has been included in the youth experiences section of the questionnaire for adolescents aged 12 to 17 and in the mental health section for adults aged 18 or older. The GAD‑7 is a validated self‐report measure to screen for GAD and assess the severity of symptoms of GAD in the past 2 weeks (Spitzer et al., 2006). Symptoms of GAD include feeling nervous or on edge, excessively worrying about different things, having difficulty controlling thoughts of worry, having trouble relaxing, being restless, feeling irritable, and feeling that something awful might happen."

Major Depressive Episode (Depression):
"Two sections related to MDE were included in the 2025 questionnaire: an adult depression section and an adolescent depression section. These sections were originally derived from DSM‑IV criteria for MDE and remained applicable to the more recent DSM‑5 criteria. Consistent with the DSM‑5 criteria, NSDUH does not exclude MDEs occurring exclusively in the context of bereavement. In addition, no exclusions were made for MDEs caused by medication, alcohol, illicit drugs, or any medical illness."

I do believe in the dataset, the responses are scored and we are not given the individual responses. I'm not upset about this so much. 

Because I am most interested in mental health rather than substance abuse, I'm not including many mentions of substance abuse and access measures, but all of the information is also available on the SAMHSA documents. 

Also please do not take the snippits I added as if it is a comprehensive summary of the document. There is so much more in that document, I only took what I could see and thought was most interesting. 

<br>

### US Consensus Data 2025


### References

*Center for Behavioral Health Statistics and Quality. (2025). 2024 National Survey on Drug Use and Health: Public use file data users’ guide. https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health*

*SAMHSA Center for Behavioral Health Statistics and Quality (no date) 2025 National Survey on Drug Use and Health (NSDUH):Methodological Summary and Definitions, 2025 National Survey on Drug Use and Health (NSDUH): Methodological Summary and Definitions. Available at: https://www.samhsa.gov/data/sites/default/files/reports/rpt57377/2025-nsduh-method-summary-defs/2025-nsduh-method-summary-defs.htm#2-2 (Accessed: 24 September 2026).*

## 3. Calling All Echoes
There is no Survey for this Project

## 4. Cranking the Dials
N/A

## 5. The Final Vertict
N/A